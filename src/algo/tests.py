import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np
from tensorflow.keras.datasets import fashion_mnist 
from PIL import Image

img = image.load_img('shoes28.png', target_size=(28,28), grayscale=True)
# img.show()
print(img.size)
# x = image.img_to_array(img)
# x = np.expand_dims(x, axis=0)


# images = np.vstack([x])
# img.reshape(img.shape[0], 28, 28, 1)
# img = img.resize((28, 28), Image.ANTIALIAS)

# (training_x, training_y), (tests_x, tests_y) = fashion_mnist.load_data()

# Reshape data (1, 28, 28, 1)
img = tf.reshape(img, [28, 28, 1])
# img = img.reshape(img.shape[0], 28, 28, 1)
# tests_x = tests_x.reshape(tests_x.shape[0], 28, 28, 1)


reconstructed_model = tf.keras.models.load_model('img_model')
prediction = reconstructed_model.predict(tf.expand_dims(img,axis=0))
# prediction = reconstructed_model.predict(tests_x)

print('Predictions :')
print(prediction)