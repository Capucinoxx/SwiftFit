import tensorflow as tf
from tensorflow.keras.datasets import fashion_mnist 

# Download Zalando Fashion MNIST data
(training_x, training_y), (tests_x, tests_y) = fashion_mnist.load_data()

# Reshape data (1, 28, 28, 1)
training_x = training_x.reshape(training_x.shape[0], 28, 28, 1)
tests_x = tests_x.reshape(tests_x.shape[0], 28, 28, 1)