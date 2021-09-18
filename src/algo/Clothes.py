from Model import Model
import numpy as np
from tensorflow.keras.preprocessing import image

class Clothes():
    def __init__(self, filename):
        self.model = Model()
        self.filename = filename
        self.type = None

    def get_type(self):
        # load the image
        img = self.model.load_image(self.filename)

        img_model = self.model.img_model
        # predict the class
        result = img_model.predict(img)

        return np.argmax(result)

clothes = Clothes('ressources/tshirt.png')
print(clothes.get_type())
