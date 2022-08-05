import cv2
import os;
import numpy as np
from matplotlib import pyplot as plt





OriginalFileName =  'By6E1wp7R0blhiW6xI5iKstUtL12_1659728190141'
OriginalFileNameExtension = 'jpg'

ImageImportPath = './ImageProcessing/Inputs/{}.{}'.format(OriginalFileName,OriginalFileNameExtension);
img = cv2.imread(ImageImportPath,0)
edges = cv2.Canny(img,100,200)

# plt.subplot(121),plt.imshow(img,cmap = 'gray')
# plt.title('Original Image'), plt.xticks([]), plt.yticks([])
# plt.subplot(122),plt.imshow(edges,cmap = 'gray')
# plt.title('Edge Image'), plt.xticks([]), plt.yticks([])

EdgeDetectorFilename = './ImageProcessing/Outputs/EdgeDetector_{}.{}'.format(OriginalFileName,OriginalFileNameExtension)


cv2.imwrite(EdgeDetectorFilename, edges);
print('EdgeDetector Converted')


# plt.show()
