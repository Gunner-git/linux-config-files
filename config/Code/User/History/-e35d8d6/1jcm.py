from PIL import Image
import numpy as np
import matplotlib.pyplot as plt

i=Image.open('dot.png')
image_array=np.array(i)
print(image_array)
plt.imshow(image_array)
plt.show()