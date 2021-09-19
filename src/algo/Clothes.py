from Model import Model
import numpy as np
from tensorflow.keras.preprocessing import image
from pathlib import Path
import os

class Clothes():
    def __init__(self, filename):
        self.model = Model()
        self.filename = filename
        self.type = None

    def get_type(self):
        # load the image
        working_path = Path().absolute()
        path = os.path.join(working_path, self.filename)
        img = self.model.load_image(path)

        img_model = self.model.img_model
        # predict the class
        result = img_model.predict(img)

        return np.argmax(result)
    
    def associate_type(self):
        type = self.get_type()
        PANTALON = 0
        CHANDAIL = 1
        CHAUSSURE = 2
        AUTRE = 3 

        if type == 3:
            return PANTALON
        elif type == 2:
            return CHANDAIL
        else:
            return AUTRE

# from random import seed
# from random import randrange
# from random import choice
import random
import time

def create_outfit_random(tops, pants, shoes):
    random.seed(time.perf_counter())

    top_index = random.randrange(0, len(tops))
    pants_index = random.randrange(0, len(pants))
    shoes_index = random.randrange(0, len(shoes))

    return (tops[top_index], pants[pants_index], shoes[shoes_index])


# print("Predictions")
# for i in range(1, 11):
#     filename = 'ressources/shoes' + str(i) + '.png'
#     clothes = Clothes(filename)
#     print(clothes.associate_type())

# sera une liste de clothes (pas nécessairement la classe)
tops = [ 0, 1, 2, 3, 4, 5, 6 ]
pants = [ 0, 1, 2, 3, 4, 5, 6 ]
shoes = [ 0, 1, 2, 3, 4, 5, 6 ]

print(create_outfit_random(tops, pants, shoes))
print(create_outfit_random(tops, pants, shoes))
print(create_outfit_random(tops, pants, shoes))
print(create_outfit_random(tops, pants, shoes))









