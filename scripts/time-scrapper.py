from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import pandas as pd
import re
import os
import json

URL = 'https://www.worlddata.info/timezones/index.php'
FILE_NAME = 'time-zones.json'

driver = webdriver.Chrome(ChromeDriverManager().install())
driver.get(URL)
driver.implicitly_wait(200)
page = BeautifulSoup(driver.page_source)

timezones = []

table = page.find_all('table', class_='std100')
rows = table[0].find_all('tr')
for row in rows:
  datas = row.find_all('td')
  if len(datas) > 0:
    timezone = {
      'code': datas[0].text,
      'name': datas[1]['data-sort'],
      'countries': datas[2].text.split(", "),
      'utc-offset-seconds': float(datas[3]['data-sort']) * 60
    }
    timezones.append(timezone)

jsonTiers = json.dumps(timezones)

f = open(FILE_NAME, 'x')
f.write(jsonTiers)
f.close()