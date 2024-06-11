from PIL import Image
import numpy as np
import matplotlib.pyplot as plt

import ast

# img=Image.open('digits/1.1.png')
# image_array=np.array(img)

# print(image_array)
# plt.imshow(image_array)
# plt.show()

list0 = []

file = open("data.txt", "r")
lines = file.read().split('\n')

lines0 = []
lines1 = []
lines2 = []
lines3 = []
lines4 = []
lines5 = []
lines6 = []
lines7 = []
lines8 = []
lines9 = []

for i in range(0,10):
    lines0.append(lines[i])

print(lines0)

# pixel_data_01 = lines[0]

# label,pixels  = pixel_data_01.split("::")

# img=Image.open('test_image.png')
# image_array=np.array(img)

# imageL=image_array.tolist()
# imageLtoStrTest=str(imageL)


# pixelList = pixels.split("], ")
# testList = imageLtoStrTest.split("], ")

# count = 0

# for i in range(0, len(pixelList)):
#     if pixelList[i] == testList[i]:
#         count += 1

# print(count)
