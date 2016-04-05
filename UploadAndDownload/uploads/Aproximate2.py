import numpy as np
import matplotlib.pyplot as plt

from ann import ANN


# coding: utf-8

# In[1]:


# In[8]:

def f(x):
    return 0.3 * x * x + 2 * np.sin(x) - 2 * x + 0.5


# In[35]:

x = np.arange(0.0, 10.0, 0.1)
y = f(x)


# In[36]:

plt.plot(x, y, 'bo')


# In[18]:

xmin = x.min()
xmin
xmax = x.max()
xmax


# In[14]:

ymin = y.min()
ymin


# In[15]:

ymax = y.max()
ymax


# In[16]:

x2 = x.copy()


# In[19]:

x2 -= xmin
x2 /= (xmax - xmin)
x2


# In[20]:

y2 = y.copy()
y2 -= ymin
y2 /= (ymax - ymin)
y2

# In[21]:

# In[22]:

fann = ANN([1, 10, 1])


# In[24]
inputs = [[x] for x in x2]
inputs


# In[25]:

targets = [[t] for t in y2]
targets


# In[26]:

fann.train(inputs, targets, 10000)


# In[29]:

pred = np.array([fann.predict(input)[0] for input in inputs])
pred


# In[30]:

predscaled = pred * (ymax - ymin) + ymin
predscaled


# In[38]:

x


# In[39]:

plt.plot(x, y, 'bo')


# In[40]:

plt.plot(x, predscaled, 'bo')


# In[41]:

plt.plot(x, y, 'bo', x, predscaled, 'r*')


# In[ ]:
