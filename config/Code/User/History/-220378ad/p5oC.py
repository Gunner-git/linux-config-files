from PIL import Image
import numpy as np
import matplotlib.pyplot as plt

# import ast

# img=Image.open('digits/1.1.png')
# image_array=np.array(img)

# print(image_array)
# plt.imshow(image_array)
# plt.show()

list0 = []

file = open("data.txt", "r")
lines = file.read().split('\n')


img=Image.open('test_image.png')
image_array=np.array(img)

imageL=image_array.tolist()
imageLtoStrTest=str(imageL)

testList = imageLtoStrTest.split("], ")
matchPix=[]

for images in range(len(lines)):
    print(lines[images])
    break
    splitEx=images.split('::')
    
    currentDigit=splitEx[0]
    currentImageStr=splitEx[1]
    eachPix=currentImageStr.split('], ')
    x=0
    while x<len(eachPix):
        if testList[x]==eachPix[x]:
            matchPix.append(int(currentDigit))
        x+=1

print(matchPix.count(0))


'''
count = 0
countList1 = []

# countList2 = []
for k in range(1,10):
    for j in range(0,10):

        pixel_data = lines[(j*10)+k]
        label,pixels  = pixel_data.split("::")
        pixelList = pixels.split("], ")

        for i in range(0, len(pixelList)):
            if pixelList[i] == testList[i]:
                count += 1

    countList1.append(count)
    count = 0

print(countList1)
print(f"The number is {countList1.index(max(countList1))}")
'''
