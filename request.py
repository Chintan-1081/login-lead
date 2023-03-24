import requests

url = 'http://localhost:3000/login'

myobj = {'somekey': 'somevalue'}

x = requests.post(url, json = myobj)


# y = requests.get('http://localhost:3000/login')
# print(y.json())
# print(y.status_code)