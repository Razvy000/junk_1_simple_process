import cv2

import os
import sys

print "razvan: ", sys.argv

if len(sys.argv) < 2:
    print 'grayscale <image>'
    exit()

path = sys.argv[1]
file_name = os.path.basename(path)

image = cv2.imread(path)

gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

cv2.imwrite('uploads/'+'gray_'+file_name, gray_image)
