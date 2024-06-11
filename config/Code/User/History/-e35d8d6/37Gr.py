from PIL import Image
import numpy as np
import matplotlib.pyplot as plt

i=Image.open('digits/9.4.png')
image_array=np.array(i)

imageL=image_array.tolist()
imageLtoStr=str(imageL)
#0:: [[[255,255,255,]]]
'''print(image_array)
plt.imshow(image_array)
plt.show()
'''


