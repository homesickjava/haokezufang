# coding=utf-8

import sys
import json
import base64
import time
import csv
import pymysql
import wordcloud

# make it work in both python2 both python3
IS_PY3 = sys.version_info.major == 3
if IS_PY3:
    from urllib.request import urlopen
    from urllib.request import Request
    from urllib.error import URLError
    from urllib.parse import urlencode
    from urllib.parse import quote_plus
else:
    import urllib2
    from urllib import quote_plus
    from urllib2 import urlopen
    from urllib2 import Request
    from urllib2 import URLError
    from urllib import urlencode

# skip https auth
import ssl
ssl._create_default_https_context = ssl._create_unverified_context

API_KEY = 'XXX'

SECRET_KEY = 'XXX'


COMMENT_TAG_URL = "https://aip.baidubce.com/rpc/2.0/nlp/v2/comment_tag"

"""  TOKEN start """
TOKEN_URL = 'https://aip.baidubce.com/oauth/2.0/token'

results = []

word_lst = []
word_dict = {}
wc_results = []



"""
    get token
"""
def fetch_token():
    params = {'grant_type': 'client_credentials',
              'client_id': API_KEY,
              'client_secret': SECRET_KEY}
    post_data = urlencode(params)
    if (IS_PY3):
        post_data = post_data.encode('utf-8')
    req = Request(TOKEN_URL, post_data)
    try:
        f = urlopen(req, timeout=5)
        result_str = f.read()
    except URLError as err:
        print(err)
    if (IS_PY3):
        result_str = result_str.decode()


    result = json.loads(result_str)

    if ('access_token' in result.keys() and 'scope' in result.keys()):
        if not 'brain_all_scope' in result['scope'].split(' '):
            print ('please ensure has check the  ability')
            exit()
        return result['access_token']
    else:
        print ('please overwrite the correct API_KEY and SECRET_KEY')
        exit()

"""
    call remote http server
"""
def make_request(url, comment):
    #print("---------------------------------------------------")
    #print("评论文本：")
    #print("    " + comment)
    #print("\n评论观点：")

    response = request(url, json.dumps(
    {
        "text": comment,
        # 13为3C手机类型评论，其他类别评论请参考 https://ai.baidu.com/docs#/NLP-Apply-API/09fc895f
        "type": 13
    }))

    data = json.loads(response)
    
    if "error_code" not in data or data["error_code"] == 0:
            for item in data["items"]:
                results.append(item["adj"])
                results.append(item["prop"])
                # 积极的评论观点
                #if item["sentiment"] == 2:
                    #print(u"    积极的评论观点: " + item["prop"] + item["adj"])
                # 中性的评论观点
                #if item["sentiment"] == 1:
                    #print(u"    中性的评论观点: " + item["prop"] + item["adj"])
                # 消极的评论观点
                #if item["sentiment"] == 0:
                    #print(u"    消极的评论观点: " + item["prop"] + item["adj"])
                    
            
    #else:
        # print error response
        #print(response)

    # 防止qps超限
    time.sleep(0.5)

"""
    call remote http server
"""
def request(url, data):
    req = Request(url, data.encode('utf-8'))
    has_error = False
    try:
        f = urlopen(req)
        result_str = f.read()
        if (IS_PY3):
            result_str = result_str.decode()
        return result_str
    except  URLError as err:
        print(err)
        

def getresult():

    conn = pymysql.connect("rm-bp1k8o8yy2u373o87jo.mysql.rds.aliyuncs.com","xiaomanyao","sDsdgSws4zkidr","hotel")
    cur = conn.cursor()
    sql="select js_contentAll from `dianping`"
    cur.execute(sql)
    data = cur.fetchall() 
    for i in data:
        comment = i
        token = fetch_token()
        url = COMMENT_TAG_URL + "?charset=UTF-8&access_token=" + token
        make_request(url, comment)
    cur.close() 
    conn.close()
    
    #with open("hotel.qunar.pinglun.utf8.demo2.csv",encoding='utf-8') as f:
    #    content = csv.DictReader(f)
    #    for row in content:
    #        comment = row['js_contentAll']
    #        token = fetch_token()
    #        url = COMMENT_TAG_URL + "?charset=UTF-8&access_token=" + token
    #        make_request(url, comment)


    with open('results.txt','w',encoding='utf-8') as f:
        for keyword in results:
            #print(keyword)
            f.write(keyword)
            f.write("\n")

    #list_sorted_words = sorted(results, key=lambda w: results[w], reverse=True)
    #for word in list_sorted_words:
    #    print("{} -- {} times".format(word, results[word]))


    # 从外部.txt文件中读取大段文本，存入变量txt中
    f = open('results.txt',encoding='utf-8')
    txt = f.read()

    # 构建词云对象w，设置词云图片宽、高、字体、背景颜色等参数
    w = wordcloud.WordCloud(width=200,
                            height=161,
                            background_color='white',
                            font_path='msyh.ttc')

    # 将txt变量传入w的generate()方法，给词云输入文字
    w.generate(txt)

    # 将词云图片导出到当前文件夹
    w.to_file('wc.png')
	
    return "true"
	
	
print(getresult())