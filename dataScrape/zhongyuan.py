from bs4 import BeautifulSoup as soup
from urllib.request import urlopen as ureq
import pandas as pd
import numpy as np
import dateutil.parser as dparser
import os

data = []
count = 0

def open_url(url):
    global count

    try:
        page_parsed = soup(ureq(url).read(),'html.parser').find_all('div',{'class':'house-item'})
        for i in range (len(page_parsed)):
            info = get_info(page_parsed[i])
            data.append(info)
            count += 1
            os.system('clear')
            print(str(round(count/17500,2)) + "%")

    except Exception as ex:
        print(ex)
    
    return info #temporary

def get_info(page_parsed):
    info = []
        
    # finds the information of the home
    div = page_parsed.find('div', {'class':'item-info'})
    num = div.h4.a['href'][8:-5]
    title = div.h4.get_text().strip()
    location = div.find_all('p')[2].get_text().strip().replace('-',' ').split(' ')
    xiaoqu = div.find_all('p')[0].find_all('a')[0].get_text().strip()
    rmbth = div.find_all('p')[0].find_all('span')[0].get_text().strip()[:-1].split('室')
    sqm = div.find_all('p')[0].find_all('span')[1].get_text().strip()[:-1]
    detail = div.find_all('p')[1].get_text().strip().split('|')
    
    if len(rmbth) < 2:
        for i in range(2 - len(rmbth)):
            rmbth.append('N/A')
    
    if len(detail) < 4:
        for i in range(4 - len(detail)):
            detail.append('N/A')

    # finds the price of the apartment
    price = int(page_parsed.find('p',{'class':'price-nub'}).get_text()[:-3])

    info.extend((num, title, location[0], location [1], location[2], xiaoqu, sqm, rmbth[0], rmbth[1], detail[3], detail[2], detail[1], detail[0], price))

    return info
        
def launch_scrape():
    
    for i in range(875):
        url = url_base + str(i+1)
        print(i)
        open_url(url)

url_base = 'http://sh.centanet.com/zufang/g'

open_url(url_base + str(876))

df = pd.DataFrame(data, columns = ['id','listing','district','area','address','xiaoqu','sqm','room','bathroom','year','renovation','floor','direction','price'])

df.to_csv('zhongyuan_add.csv',sep=',')