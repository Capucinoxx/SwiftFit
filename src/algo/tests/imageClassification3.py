import tensorflow as tf
from tensorflow.python.framework import traceable_stack
import tensorflow_datasets as tfds
import math
import numpy as np

def normalize(images, labels):
  images = tf.cast(images, tf.float32)
  images /= 255 
  return images, labels

data, metadata = tfds.load('fashion_mnist', as_supervised=True, with_info=True)

training_data, test_data = data['train'], data['test']
labels = metadata.features['label'].names

training_data = training_data.map(normalize)
test_data = test_data.map(normalize)

training_data = training_data.cache()
test_data = test_data.cache()

model = tf.keras.Sequential([
  tf.keras.layers.Flatten(input_shape=(28,28,1)), 
  tf.keras.layers.Dense(50, activation=tf.nn.relu),
  tf.keras.layers.Dense(50, activation=tf.nn.relu),
  tf.keras.layers.Dense(10, activation=tf.nn.softmax) 
])

model.compile(
    optimizer='adam',
    loss=tf.keras.losses.SparseCategoricalCrossentropy(),
    metrics=['accuracy']
)

training_data = training_data.repeat().shuffle(60000).batch(32)
test_data = test_data.batch(32)

history = model.fit(
    training_data,
    epochs=5,
    steps_per_epoch=int(np.ceil(60000 / float(32)))
)

model.save('img_model3')

