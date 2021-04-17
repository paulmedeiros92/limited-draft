from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import pandas as pd
import re
import os
import json

URL = 'https://draftsim.com/STX-pick-order.php'
FILE_NAME = 'stx.json'

driver = webdriver.Chrome(ChromeDriverManager().install())
driver.get(URL)
driver.implicitly_wait(200)
page = BeautifulSoup(driver.page_source)

tiersModel = []

tiers = page.find_all('div', class_='pick_order_tier')
for tier in tiers:
  header = tier.find('h2')
  tierName = header.text[header.text.index(': ') + 2:] 
  tierModel = { 
    'tier': tierName,
    'cards': []
  }
  cards = tier.find_all('p', class_='card_label')
  for i, card in enumerate(cards):
    cardModel = {
      'rank': i + 1,
      'tier': tierName,
      'name': card.text[card.text.index('. ') + 2:]
    }
    tierModel['cards'].append(cardModel)
  tiersModel.append(tierModel)

jsonTiers = json.dumps(tiersModel)

f = open(FILE_NAME, 'x')
f.write(jsonTiers)
f.close()
