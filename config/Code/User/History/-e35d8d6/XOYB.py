from PIL import Image
import numpy as np

i=Image.open('dot.png')
image_array=np.array(i)
print(image_array)