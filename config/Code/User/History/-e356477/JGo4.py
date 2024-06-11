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
lines = file.readlines()

# lines = "0::blahblah"
pixel_data_01 = lines[0]

label,pixels  = pixel_data_01.split("::")

img=Image.open('digits/test_image.png')
image_array=np.array(img)

imageL=image_array.tolist()
imageLtoStrTest=str(imageL)



# print(pixel_data_01)

# pixel_data_01_rows = pixel_data_01.split("]]") + ""
# print(pixel_data_01_rows[0])
