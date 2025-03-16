import codecs
import json

import pandas as pd

df = pd.read_excel(r"F:\Github\VueCrawJUD\crawjud\models\export.xlsx")

to_append = []


def decode_text():
    items = df.to_dict(orient="records")
    print(items)


decode_text()
with codecs.open("export.json", encoding="utf-8", mode="w+") as f:
    f.write(json.dumps(df.to_dict(orient="records")))
