> 内容出自`3Blue1Brown`的:[线性代数的本质](https://www.bilibili.com/video/av6731067/)

### 07-点积与对偶性
#### 1、引入点积
如果你有两个维度相同的向量,求他们的点积就是将相应坐标配对,求出每一对的乘积,然后将结果相加。
![alt](001.png)

#### 2、点积的几何解释
求向量$\vec{v}$和$\vec{w}$的点积。
![alt](002.png)
将投影长度
![alt](004.png)
与向量$\vec{v}$的长度
![alt](005.png)
相乘,就是点积的结果。
![alt](003.png)

除非$\vec{w}$的投影与$\vec{v}$相反,那么结果是负的。
![alt](006.png)

#### 3、点积公式推导
![alt](007.png)

多维空间到一维的线性变换。
![alt](008.png)
![alt](009.png)

变换的结果取决于基向量i，j。但是这次基向量落在一个数上。所以当我们将他们变换后的位置记录为矩阵时，矩阵的每一列只有一个数。
![alt](010.png)

举一个例子,了解它对向量作用的含义。
有一个向量$\vec{v}$:
![alt](011.png)

线性变换矩阵:
$$
\begin{bmatrix}
1 & -2
\end{bmatrix}
$$

![alt](012.png)

要跟踪向量$\vec{v}$变换之后的去向:
$$
\begin{bmatrix}
1 & -2
\end{bmatrix} *
\begin{bmatrix}
4 \\
3
\end{bmatrix} = 1*4 + (-2)*3 =-2
$$
![alt](013.png)

$1*2$矩阵与向量相乘这一数值运算过程,感觉和两个向量点积一样。那个1*2的矩阵不正像是一个倾倒的向量么？
![alt](014.png)

实际上,我们现在可以说,1*2矩阵与2维向量有着微妙的联系。这种关系在于:将向量放倒,从而得到与之相关的矩阵。或者将矩阵直立,得到与之相关的向量。
![alt](015.png)
![alt](016.png)

但是我们现在只是从数值表达上看到这个联系,所以向量和矩阵来回转化看上去毫无意义。但是这暗示了一点,从几何角度可以看到一些美妙的事情。

将向量转化为数的`线性变换`和这个`向量本身`有着某种联系。

现在我们将数轴复制一份,然后保持0与原点重合,斜着放置在空间中。
![alt](017.png)

现在考虑这样一个二维向量$\vec{u}$,它的终点落在这条数轴的1上。
![alt](018.png)

![alt](019.png)

![alt](020.png)

从二维到一维的映射函数:
![alt](021.png)

二维到一维的投影矩阵是多少？
![alt](022.png)

![alt](023.png)

为了找到这个矩阵,我们把这条斜着的数轴放倒来看,并且要考虑变换后的基向量$\vec{i}和\vec{j}$的位置,因为他们就是矩阵的列。
![alt](024.png)

这一部分可以通过对称性推理.因为i和u都是单位向量,所以i在u上的投影与u在i的投影看上去完全对称。
![alt](025.png)

要得到i在u上的投影,其实就是u在i上的投影,就是u的横坐标。
![alt](026.png)

同理也可以得到j在u上的投影.
![alt](027.png)

所以描述投影变换的1*2矩阵的两列,就分别是向量u的两个坐标。

空间中任意向量经过投影变换的结果,也就是投影矩阵与这个向量相乘。
![alt](028.png)

向量与u的点积,和这个结果相同。
![alt](029.png)

因为矩阵向量乘积(二维到一维的变换)和向量点乘结果表达式相同:
![alt](030.png)

所以与单位向量点积可以解读为将二维向量映射到一维空间,也就是将向量投影到单位向量所在直线上得到的投影长度。
![alt](031.png)
![alt](032.png)

如果u非单位向量,
![alt](033.png)
那么投影矩阵:
![alt](034.png)

可以看成是单位向量的投影,然后再缩放。
![alt](035.png)

#### 3、对偶性
![alt](036.png)

#### 4、小结
两个向量做点乘,就是将其中一个向量转化为线性变换。
![alt](037.png)
等价于：
![alt](038.png)

<全文结束>
