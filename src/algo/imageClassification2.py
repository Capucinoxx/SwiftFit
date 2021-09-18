import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np
from tensorflow.keras.datasets import fashion_mnist
from tensorflow.python.ops.gen_batch_ops import batch 

(training_x, training_y), (tests_x, tests_y) = fashion_mnist.load_data()

model = tf.keras.Sequential([
    tf.keras.layers.Flatten(input_shape=(28,28)),
    tf.keras.layers.Dense(128, activation=tf.nn.relu),
    tf.keras.layers.Dense(10, activation=tf.nn.softmax)
])

model.compile(
    optimizer=tf.optimizers.Adam(),
    loss = 'sparse_categorical_crossentropy',
    metrics=["accuracy"]
)

model.fit(training_x, training_y, epochs=5, batch_size=32)

model.evaluate(tests_x, tests_y)

model.save("img_model2")