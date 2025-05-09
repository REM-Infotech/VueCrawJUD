"""Search module: Search legal process using system-specific methods; log status and results immediately.

This module provides the SearchBot class to perform legal process searches. Each method
uses system-specific logic and logs progress. Replace or update the docstrings as needed.
"""

from __future__ import annotations

from contextlib import suppress
from datetime import datetime
from time import sleep

import pytz
from selenium.common.exceptions import NoSuchElementException, StaleElementReferenceException, TimeoutException
from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.support.wait import WebDriverWait

from crawjud.bot.common import ExecutionError
from crawjud.bot.core import CrawJUD


class SearchBot(CrawJUD):
    """Initialize and perform process searches for various systems.

    This class implements search methods to locate legal processes across different systems.
    Each method logs progress and handles errors as needed.
    """

    def __init__(self) -> None:
        """Initialize SearchBot instance.

        Sets up necessary attributes for search operations.
        """

    def search_(self) -> bool:
        """Perform a search for a legal process using the appropriate system method.

        Returns:
            bool: True if the process is found; False otherwise.

        Logs messages before and after the search.

        """
        self.message = (
            f'Buscando processos pelo nome "{self.parte_name}"'
            if self.typebot == "proc_parte"
            else f"Buscando Processo Nº{self.bot_data.get('NUMERO_PROCESSO')}"
        )
        self.type_log = "log"
        self.prt()

        src: bool = getattr(self, f"{self.system.lower()}_search", None)()

        if src is True:
            self.message = "Processo encontrado!"
            self.type_log = "log"
            self.prt()

        return src

    def elaw_search(self) -> bool:
        """Perform an ELAW system search for a legal process.

        Returns:
            bool: True if the process is found; False otherwise.

        Navigates to the appropriate ELAW page, interacts with elements, and clicks to open the process.

        """
        if self.driver.current_url != "https://amazonas.elaw.com.br/processoList.elaw":
            self.driver.get("https://amazonas.elaw.com.br/processoList.elaw")

        campo_numproc: WebElement = self.wait.until(ec.presence_of_element_located((By.ID, "tabSearchTab:txtSearch")))
        campo_numproc.clear()
        sleep(0.15)
        self.interact.send_key(campo_numproc, self.bot_data.get("NUMERO_PROCESSO"))

        self.driver.find_element(By.ID, "btnPesquisar").click()
        search_result: WebElement = self.wait.until(ec.presence_of_element_located((By.ID, "dtProcessoResults_data")))

        open_proc = None
        with suppress(NoSuchElementException):
            open_proc = search_result.find_element(By.ID, "dtProcessoResults:0:btnProcesso")

        sleep(1.5)

        diff_cad = str(self.typebot.upper()) != "CADASTRO"
        diff_complement = str(self.typebot.upper()) != "COMPLEMENT"
        if open_proc:
            chkTypeBot = diff_cad and diff_complement  # noqa: N806
            if chkTypeBot:
                clicked = False
                with suppress(StaleElementReferenceException):
                    open_proc.click()
                    clicked = True

                if not clicked:
                    self.wait.until(
                        ec.presence_of_element_located((
                            By.ID,
                            "dtProcessoResults_data",
                        ))
                    ).find_element(
                        By.ID,
                        "dtProcessoResults:0:btnProcesso",
                    ).click()

            return True

        return False

    def esaj_search(self) -> bool:
        """Perform an ESAJ system search for a legal process.

        Returns:
            bool: True if the process is found; False otherwise.

        Navigates to ESAJ pages and processes inputs based on process grade with error handling.

        """
        grau = self.bot_data.get("GRAU", 1)

        if not grau:
            grau = 1

        if isinstance(grau, str):
            if "º" in grau:
                grau = grau.replace("º", "").replace(" ", "")

            grau = int(grau)

        if grau == 1:
            self.driver.get(self.elements.consultaproc_grau1)
            id_consultar = "botaoConsultarProcessos"

        elif grau == 2:
            self.driver.get(self.elements.consultaproc_grau2)
            id_consultar = "pbConsultar"

        elif not grau or grau != 1 or grau != 2:
            raise ExecutionError(message="Informar instancia!")

        sleep(1)
        # Coloca o campo em formato "Outros" para inserir o número do processo
        ratioNumberOld: WebElement = self.wait.until(ec.presence_of_element_located((By.ID, "radioNumeroAntigo")))  # noqa: N806
        self.interact.click(ratioNumberOld)

        # Insere o processo no Campo
        lineprocess: WebElement = self.wait.until(ec.presence_of_element_located((By.ID, "nuProcessoAntigoFormatado")))
        self.interact.click(lineprocess)
        self.interact.send_key(lineprocess, self.bot_data.get("NUMERO_PROCESSO"))

        # Abre o Processo
        openprocess = None
        with suppress(TimeoutException):
            openprocess: WebElement = self.wait.until(ec.presence_of_element_located((By.ID, id_consultar)))
            self.interact.click(openprocess)

        check_process = None
        with suppress(NoSuchElementException, TimeoutException):
            check_process = WebDriverWait(self.driver, 5).until(
                ec.presence_of_element_located((By.CSS_SELECTOR, "#numeroProcesso")),
            )

        # Retry 1
        if not check_process:
            with suppress(NoSuchElementException, TimeoutException):
                check_process: WebElement = WebDriverWait(self.driver, 5).until(
                    ec.presence_of_element_located((By.CSS_SELECTOR, 'div[id="listagemDeProcessos"]')),
                )

                if check_process:
                    check_process = (
                        check_process.find_element(By.TAG_NAME, "ul")
                        .find_elements(By.TAG_NAME, "li")[0]
                        .find_element(By.TAG_NAME, "a")
                    )

                    url_proc = check_process.get_attribute("href")
                    self.driver.get(url_proc)

        # Retry 2
        if not check_process:
            with suppress(NoSuchElementException, TimeoutException):
                check_process: WebElement = WebDriverWait(self.driver, 5).until(
                    ec.presence_of_element_located(
                        (By.CSS_SELECTOR, 'div.modal__process-choice > input[type="radio"]'),
                    ),
                )

                if check_process:
                    check_process.click()
                    btEnviarIncidente = self.driver.find_element(By.CSS_SELECTOR, 'input[name="btEnviarIncidente"]')  # noqa: N806
                    btEnviarIncidente.click()

        return check_process is not None

    def projudi_search(self) -> bool:
        """Perform a PROJUDI system search for a legal process.

        Returns:
            bool: Search result based on the type of search method invoked.

        Redirects to appropriate search routines for each process type.

        """
        self.driver.get(self.elements.url_busca)

        if self.typebot != "proc_parte":
            returns = self.search_proc()

        if self.typebot == "proc_parte":
            returns = self.search_proc_parte()

        return returns

    def search_proc(self) -> bool:
        """Perform a PROJUDI search for a legal process by process number.

        Returns:
            bool: True if the process is successfully entered; False otherwise.

        Handles input, clicking, and conditional retries.

        """
        inputproc = None
        enterproc = None
        allowacess = None

        grau = self.bot_data.get("GRAU", 1)

        if grau is None:
            grau = 1

        if isinstance(grau, str):
            grau = grau.strip()

        grau = int(grau)

        def detect_intimacao() -> None:
            if "intimacaoAdvogado.do" in self.driver.current_url:
                raise ExecutionError(message="Processo com Intimação pendente de leitura!")

        def get_link_grau2() -> str | None:
            """Retrieve the link to access the resources related to the process for the second grade.

            This method waits for the presence of the link to access the resources related to the process
            and filters the last element in the list of elements that contains the text "Clique aqui para
            visualizar os recursos relacionados". If the link is found, it returns the href attribute of
            the element. Otherwise, it returns None.

            Returns:
                str | None: The link to access the resources related to the process or None.

            """
            with suppress(Exception, TimeoutException, NoSuchElementException):
                info_proc = self.wait.until(
                    ec.presence_of_all_elements_located(
                        (By.CSS_SELECTOR, "table#informacoesProcessuais > tbody > tr > td > a"),
                    ),
                )

                info_proc = list(
                    filter(lambda x: "Clique aqui para visualizar os recursos relacionados" in x.text, info_proc),
                )[-1]

                return info_proc.get_attribute("href")

            return None

        with suppress(TimeoutException):
            inputproc: WebElement = self.wait.until(
                ec.presence_of_element_located((By.CSS_SELECTOR, "#numeroProcesso")),
            )

        if inputproc:
            inputproc.send_keys(self.bot_data.get("NUMERO_PROCESSO"))
            consultar = self.driver.find_element(By.CSS_SELECTOR, "#pesquisar")
            consultar.click()

            with suppress(TimeoutException):
                enterproc: WebElement = self.wait.until(ec.presence_of_element_located((By.CLASS_NAME, "link")))

            if enterproc:
                enterproc.click()
                to_grau2 = get_link_grau2()

                detect_intimacao()

                with suppress(TimeoutException, NoSuchElementException):
                    allowacess = self.driver.find_element(By.CSS_SELECTOR, "#habilitacaoProvisoriaButton")

                if allowacess:
                    allowacess.click()
                    sleep(1)

                    confirmterms = self.driver.find_element(By.CSS_SELECTOR, "#termoAceito")
                    confirmterms.click()
                    sleep(1)

                    save = self.driver.find_element(By.CSS_SELECTOR, "#saveButton")
                    save.click()

                if grau == 2 and to_grau2:
                    self.driver.get(to_grau2)

                return True

            if not enterproc:
                return False

        return False

    def search_proc_parte(self) -> bool:
        """Perform a PROJUDI search for a legal process by party name.

        Returns:
            bool: True if the process is found; False otherwise.

        Inputs party, document, date data and handles the search process.

        """
        allprocess = self.wait.until(
            ec.presence_of_element_located((By.CSS_SELECTOR, 'input[value="qualquerAdvogado"]')),
        )
        allprocess.click()
        data_inicio_xls = self.data_inicio
        data_fim_xls = self.data_fim

        if type(data_inicio_xls) is str:
            data_inicio_xls = datetime.strptime(data_inicio_xls, "%Y-%m-%d").replace(
                tzinfo=pytz.timezone("America/Manaus")
            )
            data_inicio_xls = data_inicio_xls.strftime("%d/%m/%Y")

        if type(data_fim_xls) is str:
            data_fim_xls = datetime.strptime(data_fim_xls, "%Y-%m-%d").replace(tzinfo=pytz.timezone("America/Manaus"))
            data_fim_xls = data_fim_xls.strftime("%d/%m/%Y")

        if self.vara == "TODAS AS COMARCAS":
            alljudge = WebDriverWait(self.driver, 10).until(
                ec.presence_of_element_located((By.CSS_SELECTOR, 'input[name="pesquisarTodos"]')),
            )
            alljudge.click()

        elif self.vara != "TODAS AS COMARCAS":
            search_vara = self.driver.find_element(By.ID, "descricaoVara")
            search_vara.click()
            search_vara.send_keys(self.vara)
            sleep(3)
            vara_option = self.driver.find_element(By.ID, "ajaxAuto_descricaoVara").find_elements(By.TAG_NAME, "li")[0]
            vara_option.click()

        sleep(3)
        input_parte = self.driver.find_element(By.CSS_SELECTOR, 'input[name="nomeParte"]')
        input_parte.send_keys(self.parte_name)

        cpfcnpj = self.driver.find_element(By.CSS_SELECTOR, 'input[name="cpfCnpj"]')
        cpfcnpj.send_keys(self.doc_parte)

        data_inicio = self.driver.find_element(By.CSS_SELECTOR, 'input[id="dataInicio"]')
        data_inicio.send_keys(data_inicio_xls)

        data_fim = self.driver.find_element(By.CSS_SELECTOR, 'input[name="dataFim"]')
        data_fim.send_keys(data_fim_xls)

        if self.polo_parte.lower() == "reu":
            setréu = self.driver.find_element(By.CSS_SELECTOR, 'input[value="promovido"]')
            setréu.click()

        elif self.polo_parte.lower() == "autor":
            setautor = self.driver.find_element(By.CSS_SELECTOR, 'input[value="promovente"')
            setautor.click()

        procenter = self.driver.find_element(By.ID, "pesquisar")
        procenter.click()
        sleep(3)

        with suppress(TimeoutException):
            enterproc: WebElement = self.wait.until(ec.presence_of_element_located((By.CLASS_NAME, "link")))

        if enterproc:
            return True

        return False
