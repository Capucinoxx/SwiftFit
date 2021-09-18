from Model import Model
import numpy as np
from tensorflow.keras.preprocessing import image

class Clothes():
    def __init__(self, filename):
        self.model = Model()
        self.filename = filename
        self.type = None

    def load_image(self, filename):
        # load the image
        img = image.load_img(filename, grayscale=True, target_size=(28, 28))
        # convert to array
        img = image.img_to_array(img)
        # reshape into a single sample with 1 channel
        img = img.reshape(1, 28, 28, 1)
        # prepare pixel data
        img = img.astype('float32')
        img = img / 255.0
        return img

    def get_type(self):
        # load the image
        img = self.load_image(self.filename)

        img_model = self.model.img_model
        # predict the class
        result = img_model.predict(img)

        return np.argmax(result)

clothes = Clothes('ressources/tshirt.png')
print(clothes.get_type())
