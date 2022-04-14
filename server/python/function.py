import numpy as np
import json

genres = ["blues", "classical", "country", "disco", "hiphop", "jazz", "metal", "pop", "reggae", "metal"]
genres.sort()
u = np.array([1,2,5,9])
c = np.array([225,5,8,2])

higherGuess = np.argmax(c)

guess  = genres[u[higherGuess]]

total = 0

for i in c:
    total = total + i

array = []
for i in range(len(u)):
    array.append({"name": genres[u[i]], "count": c[i]})

result = {
    "guess": array,
    "higherGuess": guess,
    "total": total,
    "message": "success"
}
print(result)
# array = []
# for i in u:
#     array.append(genres[i])
#     # print(genres[i])

# total = 0

# for i in c:
#     total = total + i

# zip_iterator = zip(array, c)
# dicti = dict(zip_iterator)

# print(dicti)

