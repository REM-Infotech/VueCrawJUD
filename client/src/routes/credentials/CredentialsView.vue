<template>
    <div class="container-fluid px-4">
        <div class="card mt-4 mb-3">
            <div class="card-header mb-3">
                <h1 class="mb-3"></h1>
                <hr />
                <a
                    href="{{ url_for('creds.cadastro') }}"
                    class="btn btn-icon-split btn-success mb-3"
                >
                    <span class="icon text-white-50">
                        <i class="fa-solid fa-plus"></i>
                    </span>
                    <span class="text">Cadastrar</span>
                </a>
                <button
                    type="button"
                    data-bs-toggle="modal"
                    class="btn btn-icon-split btn-warning mb-3"
                    data-bs-target="#importarquivo"
                >
                    <span class="icon text-white-50">
                        <i class="fa-solid fa-file-import"></i>
                    </span>
                    <span class="text">Import em lotes</span>
                </button>
                <a href="#" class="btn btn-icon-split btn-primary mb-3">
                    <span class="icon text-white-50">
                        <i class="fa-solid fa-file-csv"></i>
                    </span>
                    <span class="text">Gerar Relatório</span>
                </a>
            </div>
            <div class="card-body">
                <div class="row g-3">
                    <!-- {% if form %}
          <div class="col-md-12">
            <form
              action="{{ url_for('procs.consulta') }}"
              method="post"
              name="formBusca"
              id="formBusca"
            >
              {{ form.hidden_tag() }}
              <div class="row g-2">
                <div class="col-md-2">
                  {{ form.tipoBusca(class="form-select", id="tipoBusca", placeholder="...") }}
                </div>
                <div class="col-md-8">
                  {{ form.campo_busca(class="form-control", id="campoBusca", placeholder="Busque por...")
                  }}
                </div>
                <div class="col-md-2">
                  <div class="mb-3 d-grid gap-2">
                    {{ form.submit(class="btn btn-primary btn-md h-100") }}
                  </div>
                </div>
              </div>
            </form>
          </div>
          {% endif %} -->
                    <hr />
                    <div class="col-md-12">
                        <div class="table-responsive mb-3">
                            <table class="table table-striped" id="DataTable">
                                <thead>
                                    <tr role="row">
                                        <th>#</th>
                                        <th>Nome Credencial</th>
                                        <th>Portal</th>
                                        <th>Metodo Login</th>
                                        <th data-sortable="false">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- {% if database %} {% for item in database %}
                  <tr>
                    <td>{{ item.id }}</td>
                    <td>{{ item.nome_credencial }}</td>
                    <td>{{ item.system }}</td>
                    {% if item.login_method == "pw" %}
                    <td>Usuário/Senha</td>
                    {% elif item.login_method == "cert" %}
                    <td>Certificado A1</td>
                    {% endif %}
                    <td>
                      <a
                        href="{{ url_for('creds.editar', id_ = item.id) }}"
                        class="btn btn-icon-split btn-warning btn-sm mb-2"
                      >
                        <span class="icon text-white-50">
                          <i class="fa-solid fa-pen"></i>
                        </span>
                        <span class="text">Editar</span>
                      </a>
                      <button
                        type="button"
                        id="DeleteEpiButton"
                        class="btn btn-icon-split btn-danger btn-sm mb-2"
                        hx-post="{{ url_for('creds.deletar', id_ = item.id) }}"
                        hx-trigger="click"
                        hx-target="#results"
                      >
                        <span class="icon text-white-50">
                          <i class="fa-solid fa-trash"></i>
                        </span>
                        <span class="text">Deletar</span>
                      </button>
                    </td>
                  </tr>
                  {% endfor %} {% endif %} -->
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th>#</th>
                                        <th>Nome Credencial</th>
                                        <th>Portal</th>
                                        <th>Metodo Login</th>
                                        <th>Ações</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="results"></div>
</template>
