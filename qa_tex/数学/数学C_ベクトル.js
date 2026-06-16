// 数学C: ベクトル
const qa_数学C_ベクトル = [
  ["点 \\(A\\) の位置ベクトルを \\(\\vec a\\)、点 \\(B\\) の位置ベクトルを \\(\\vec b\\) とするとき、\\(\\overrightarrow{AB}\\) は？", "\\(\\overrightarrow{AB}=\\vec b-\\vec a\\)"],
  ["\\(\\vec a=(a_1,a_2),\\ \\vec b=(b_1,b_2)\\) の和と差は？", "\\(\\vec a+\\vec b=(a_1+b_1,a_2+b_2)\\)\n\\(\\vec a-\\vec b=(a_1-b_1,a_2-b_2)\\)"],
  ["\\(\\vec a=(a_1,a_2)\\) の大きさ \\( |\\vec a| \\) は？", "\\(|\\vec a|=\\sqrt{a_1^2+a_2^2}\\)"],
  ["零ベクトルでない \\(\\vec a\\) と同じ向きの単位ベクトルは？", "\\(\\displaystyle \\frac{\\vec a}{|\\vec a|}\\)"],
  ["零ベクトルでない \\(\\vec a,\\vec b\\) が平行である条件は？", "ある実数 \\(k\\) が存在して\n\\(\\vec b=k\\vec a\\)"],
  ["\\(\\vec a=(a_1,a_2),\\ \\vec b=(b_1,b_2)\\) の内積は？", "\\(\\vec a\\cdot\\vec b=a_1b_1+a_2b_2\\)"],
  ["\\(\\vec a,\\vec b\\) のなす角を \\(\\theta\\) とするとき、内積は？", "\\(\\vec a\\cdot\\vec b=|\\vec a||\\vec b|\\cos\\theta\\)"],
  ["零ベクトルでない \\(\\vec a,\\vec b\\) が垂直である条件は？", "\\(\\vec a\\cdot\\vec b=0\\)"],
  ["零ベクトルでない \\(\\vec a,\\vec b\\) のなす角 \\(\\theta\\) の余弦は？", "\\(\\displaystyle \\cos\\theta=\\frac{\\vec a\\cdot\\vec b}{|\\vec a||\\vec b|}\\)"],
  ["\\(\\vec a\\) の \\(\\vec b\\) 方向への正射影ベクトルは？ \\(\\vec b\\ne\\vec0\\)", "\\(\\displaystyle \\frac{\\vec a\\cdot\\vec b}{|\\vec b|^2}\\vec b\\)"],
  ["点 \\(P\\) が線分 \\(AB\\) を \\(m:n\\) に内分するとき、位置ベクトル \\(\\vec p\\) は？", "\\(\\displaystyle \\vec p=\\frac{n\\vec a+m\\vec b}{m+n}\\)"],
  ["点 \\(P\\) が線分 \\(AB\\) を \\(m:n\\) に外分するとき、位置ベクトル \\(\\vec p\\) は？ \\(m\\ne n\\)", "\\(\\displaystyle \\vec p=\\frac{-n\\vec a+m\\vec b}{m-n}\\)"],
  ["三角形 \\(ABC\\) の重心 \\(G\\) の位置ベクトルは？", "\\(\\displaystyle \\vec g=\\frac{\\vec a+\\vec b+\\vec c}{3}\\)"],
  ["点 \\(A\\) を通り、方向ベクトル \\(\\vec d\\) に平行な直線上の点 \\(P\\) の位置ベクトルは？", "\\(\\vec p=\\vec a+t\\vec d\\quad(t\\in\\mathbb R)\\)"],
  ["点 \\(A\\) を通り、零ベクトルでない法線ベクトル \\(\\vec n\\) をもつ平面上の点 \\(P\\) の条件は？", "\\(\\vec n\\cdot(\\vec p-\\vec a)=0\\)"],
  ["\\(\\vec a=(a_1,a_2,a_3)\\) の大きさは？", "\\(|\\vec a|=\\sqrt{a_1^2+a_2^2+a_3^2}\\)"],
  ["空間ベクトル \\(\\vec a=(a_1,a_2,a_3),\\ \\vec b=(b_1,b_2,b_3)\\) の内積は？", "\\(\\vec a\\cdot\\vec b=a_1b_1+a_2b_2+a_3b_3\\)"],
  ["点 \\(A(x_1,y_1,z_1)\\), \\(B(x_2,y_2,z_2)\\) の距離は？", "\\(\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2+(z_2-z_1)^2}\\)"],
  ["平面 \\(ax+by+cz+d=0\\) の法線ベクトルは？", "\\((a,b,c)\\)"],
  ["点 \\(P(x_0,y_0,z_0)\\) と平面 \\(ax+by+cz+d=0\\) の距離は？", "\\(\\displaystyle \\frac{|ax_0+by_0+cz_0+d|}{\\sqrt{a^2+b^2+c^2}}\\)" ]
];
