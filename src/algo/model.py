import tensorflow as tf
# from tests import load_image
import numpy as np

class Model(object):
    class __Model():
        def __init__(self):
            self.img_model = tf.keras.models.load_model('final_model.h5')
            
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
        