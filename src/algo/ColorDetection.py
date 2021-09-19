import cv2
import numpy as np
from sklearn.cluster import KMeans
from collections import Counter
import matplotlib.pyplot as plt



class ColorDetection(object):
    def __init__(self, filename):
        self.filename = filename

    def rgd_to_Hex(self, color):
        return "#{:02x}{:02x}{:02x}".format(int(color[0]), int(color[1]), int(color[2]))

    def remove_image_background(self):
        img = cv2.imread(self.filename)
        gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        _, thresh = cv2.threshold(gray_img, 127, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
        img_contours = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)[-2]
        img_contours = sorted(img_contours, key=cv2.contourArea)

        for i in img_contours:

            if cv2.contourArea(i) > 100:

                break
        mask = np.zeros(img.shape[:2], np.uint8)
        cv2.drawContours(mask, [i],-1, 255, -1)
        new_img = cv2.bitwise_and(img, img, mask=mask)
        cv2.imwrite('test.png', new_img)

    def get_colors(self):
        self.remove_image_background()

        image = cv2.imread('test.png')
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        resized_image = cv2.resize(image, (28, 28), interpolation = cv2.INTER_AREA)
        resized_image = resized_image.reshape(resized_image.shape[0]*resized_image.shape[1], 3)

        clf = KMeans(n_clusters=3)
        labels = clf.fit_predict(resized_image)

        counts = Counter(labels)
        center_colors = clf.cluster_centers_
        ordered_colors = [center_colors[i] for i in counts.keys()]
        hex_colors = [self.rgd_to_Hex(ordered_colors[i]) for i in counts.keys()]

        
        plt.figure(figsize = (8, 6))
        plt.pie(counts.values(), labels = hex_colors, colors = hex_colors)
        plt.show()

        return hex_colors


color_detection = ColorDetection('ressources/tshirt3.png')
color = color_detection.get_colors();
print(color)
    