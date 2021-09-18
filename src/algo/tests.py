import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np
from tensorflow.keras.datasets import fashion_mnist 
from PIL import Image

# img = image.load_img('pantalon.png', target_size=(28,28), grayscale=True)
# # img.show()
# # print(img.size)
# # x = image.img_to_array(img)
# # x = np.expand_dims(x, axis=0)


# # images = np.vstack([x])
# # img.reshape(img.shape[0], 28, 28, 1)
# # img = img.resize((28, 28), Image.ANTIALIAS)

# # (training_x, training_y), (tests_x, tests_y) = fashion_mnist.load_data()

# # Reshape data (1, 28, 28, 1)
# img = tf.reshape(img, [28, 28, 1])
# # img = img.reshape(img.shape[0], 28, 28, 1)
# # tests_x = tests_x.reshape(tests_x.shape[0], 28, 28, 1)


# reconstructed_model = tf.keras.models.load_model('img_model3')
# prediction = reconstructed_model.predict(tf.expand_dims(img,axis=0))
# # prediction = reconstructed_model.predict(tests_x[0:5])

# print('Predictions :')
# print(np.argmax(prediction, axis=1))
# print(np.argmax(prediction))

# print(prediction)

# load and prepare the image
def load_image(filename):
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

# load an image and predict the class
def get_type():

	# load the image
	# img = load_image('ressources/tshirt.png')
	# load model
	model = tf.keras.models.load_model('final_model.h5')

	# predict the class
	# result = model.predict(img)

	# print(np.argmax(result, axis=1))
	
 
# entry point, run the example
get_type()