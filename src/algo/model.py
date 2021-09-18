import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image

class Model(object):
    class __Model():
        def __init__(self):
            self.img_model = tf.keras.models.load_model('final_model.h5')

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
            
    instance = None

    def __new__(cls):
        if not Model.instance:
            Model.instance = Model.__Model()
        return Model.instance 


# x = Model()
# model = x.img_model

# img = load_image('ressources/tshirt.png')
# result = model.predict(img)

# print(np.argmax(result, axis=1))
# print(x)
# y = Model()
# print(y)
# z = Model()
# print(z)
# print(x)
# print(y)
#<hr>
        