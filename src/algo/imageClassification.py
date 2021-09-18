import tensorflow as tf
from tensorflow.keras.datasets import fashion_mnist 
from tensorflow.keras.utils import to_categorical
# from tensorflow.keras.preprocessing.image import ImageDataGenerator
import numpy as np

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

# Data augmentation (pour avoir différents angles)
rotation = 30
width = 0.25
height = 0.25
zoom = [0.5, 1.5]

datagen= tf.keras.preprocessing.image.ImageDataGenerator(
    rotation_range = rotation,
    width_shift_range = width,
    height_shift_range = height,
    zoom_range = zoom
)

datagen.fit(training_x)


# Model
model = tf.keras.models.Sequential([
    tf.keras.layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)), # image 28 par 28 pixels en noir et blanc
    tf.keras.layers.MaxPooling2D(2, 2),

    tf.keras.layers.Conv2D(64, (3, 3), activation='relu'),
    tf.keras.layers.MaxPooling2D(2, 2),
    
    tf.keras.layers.Dropout(0.5),
    tf.keras.layers.Flatten(),
    tf.keras.layers.Dense(100, activation='relu'),
    tf.keras.layers.Dense(10, activation="softmax")
])

# Compilation
model.compile(
    optimizer = 'adam',
    loss = 'categorical_crossentropy',
    metrics = ['accuracy']
)

training_x = np.asarray(training_x)
training_y = np.asarray(training_y)
tests_x = np.asarray(tests_x)
tests_y = np.asarray(tests_y)

training_data_gen = datagen.flow(training_x, training_y, batch_size=32)

# Training
print('Model training...')
epochs = 60
batch = 32

history = model.fit(
    training_data_gen,
    epochs = epochs,
    batch_size = batch,
    validation_data = (tests_x, tests_y),
    steps_per_epoch = int(np.ceil(60000 / float(batch))),
    validation_steps = int(np.ceil(10000 / float(batch)))
)

print('Model trained...')

model.evaluate(tests_x, tests_y)

model.save("img_model")