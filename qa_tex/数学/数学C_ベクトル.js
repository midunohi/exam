// 数学C: ベクトル
const qa_数学C_ベクトル = [
  ["\\(\\vec a,\\vec b\\) のなす角を \\(\\theta\\) とするとき、内積は？", "\\(\\vec a\\cdot\\vec b=|\\vec a||\\vec b|\\cos\\theta\\)"],
  ["\\(\\vec a\\cdot\\vec b\\text{ の定義}\\)", "\\(\\vec a\\cdot\\vec b=|\\vec a||\\vec b|\\cos\\theta\\)"],
  ["零ベクトルでない \\(\\vec a,\\vec b\\) のなす角 \\(\\theta\\) の余弦は？", "\\(\\displaystyle\\cos\\theta=\\frac{\\vec a\\cdot\\vec b}{|\\vec a||\\vec b|}\\)"],
  ["零ベクトルでない \\(\\vec a,\\vec b\\) が垂直である条件は？", "\\(\\vec a\\cdot\\vec b=0\\)"],
  ["\\(\\vec a\\perp\\vec b\\text{ の条件}\\)", "\\(\\vec a\\cdot\\vec b=0\\)"],
  ["\\(|\\vec a-\\vec b|^2\\text{ を展開}\\)", "\\(|\\vec a-\\vec b|^2=|\\vec a|^2-2\\vec a\\cdot\\vec b+|\\vec b|^2\\)"],
  ["\\(\\text{コーシー・シュワルツの不等式}\\)", "\\(\\displaystyle(\\vec a\\cdot\\vec b)^2\\le |\\vec a|^2|\\vec b|^2\\)"],
  ["\\(\\left(\\sum a_ib_i\\right)^2\\le ? \\)", "\\(\\displaystyle\\left(\\sum a_ib_i\\right)^2\\le\\left(\\sum a_i^2\\right)\\left(\\sum b_i^2\\right)\\)"],
  ["\\(\\vec a\\) の \\(\\vec b\\) 方向への正射影ベクトルは？ \\(\\vec b\\ne\\vec0\\)", "\\(\\displaystyle\\frac{\\vec a\\cdot\\vec b}{|\\vec b|^2}\\vec b\\)"],
  ["\\(\\vec a=(2,-1),\\vec b=(t,4)\\) が垂直になる \\(t\\) を求めよ。", "\\(\\vec a\\cdot\\vec b=2t-4=0\\) より \\(t=2\\)"],
  ["点 \\(P(2,0)\\) から直線 \\(\\boldsymbol{x}=(1,0)+t(1,1)\\) に下ろした垂線の\n足と距離を求めよ。", "足を \\(Q=(1+t,t)\\) とすると \\((P-Q)\\cdot(1,1)=1-2t=0\\) より \\(t=\\dfrac12\\)。\nしたがって \\(Q=(\\dfrac32,\\dfrac12)\\)、距離は \\(\\dfrac1{\\sqrt2}\\)"],
  ["\\(\\vec a=(2,1),\\vec b=(-1,3)\\) を2辺とする三角形の面積を求めよ。", "平行四辺形の符号付き面積は \\(2\\cdot3-1\\cdot(-1)=7\\)。\nよって三角形の面積は \\(\\dfrac72\\)"],
  ["点 \\(P\\) が線分 \\(AB\\) を \\(m:n\\) に内分するとき、位置ベクトル \\(\\vec p\\) は？", "\\(\\displaystyle\\vec p=\\frac{n\\vec a+m\\vec b}{m+n}\\)"],
  ["位置ベクトルが \\(\\vec p=\\dfrac{\\vec a+2\\vec b}3\\) である点 \\(P\\) は\n線分 \\(AB\\) をどの比に内分するか。", "\\(\\vec p=\\dfrac13\\vec a+\\dfrac23\\vec b\\) なので、\\(A\\) から \\(B\\) へ \\(2/3\\) 進んだ点である。\nよって \\(AP:PB=2:1\\)"],
  ["点 \\(P\\) が線分 \\(AB\\) を \\(m:n\\) に外分するとき、位置ベクトル \\(\\vec p\\) は？\n\\(m\\ne n\\)", "\\(\\displaystyle\\vec p=\\frac{-n\\vec a+m\\vec b}{m-n}\\)"],
  ["平面 \\(ax+by+cz+d=0\\) の法線ベクトルは？", "\\((a,b,c)\\)"],
  ["点 \\(A(1,0,0)\\) を通り、\n法線ベクトルが \\((2,-1,3)\\) である平面の方程式を求めよ。", "\\(2(x-1)-y+3z=0\\)、すなわち \\(2x-y+3z-2=0\\)"],
  ["点 \\(P(x_0,y_0,z_0)\\) と平面 \\(ax+by+cz+d=0\\) の距離は？", "\\(\\displaystyle\\frac{|ax_0+by_0+cz_0+d|}{\\sqrt{a^2+b^2+c^2}}\\)"],
  ["四面体 \\(ABCD\\) の重心を \\(G\\) とするとき、\n位置ベクトル \\(\\overrightarrow{OG}\\) は？", "\\(\\displaystyle\\overrightarrow{OG}=\\frac{\\overrightarrow{OA}+\\overrightarrow{OB}+\\overrightarrow{OC}+\\overrightarrow{OD}}4\\)"],
  ["四面体 \\(ABCD\\) の重心を \\(G\\) とするとき、底面 \\(BCD\\) からの \\(A,G\\) の高さの比は？", "\\(4:1\\)"]
];
