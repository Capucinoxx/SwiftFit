import tensorflow as tf
from tensorflow.keras.datasets import fashion_mnist 
from tensorflow.keras.utils import to_categorical


# Download Zalando Fashion MNIST data
(training_x, training_y), (tests_x, tests_y) = fashion_mnist.load_data()

# Reshape data (1, 28, 28, 1)
training_x = training_x.reshape(training_x.shape[0], 28, 28, 1)
tests_x = tests_x.reshape(tests_x.shape[0], 28, 28, 1)

# One-hot encoding
training_y = to_categorical(training_y)
tests_y = to_categorical(tests_y)

# Float conversion and data normalization 
training_x = training_x.astype('float32') / 255
tests_x = tests_x.astype('float32') / 255