// 数学Ⅲ: 積分法
const qa_数学Ⅲ_積分法 = [
  // 基本的な不定積分
  ["\\(\\displaystyle\\int x^n\\,dx\\quad(n\\ne-1)\\)", "\\(\\displaystyle\\dfrac{x^{n+1}}{n+1}+C\\)"],
  ["\\(\\displaystyle\\int \\frac1x\\,dx\\) =", "\\(\\ln|x|+C\\)"],
  ["\\(\\displaystyle\\int \\dfrac1x\\,dx\\)", "\\(\\log|x|+C\\)"],
  ["\\(\\displaystyle\\int e^x\\,dx\\) =", "\\(e^x+C\\)"],
  ["\\(\\displaystyle\\int e^x\\,dx\\)", "\\(e^x+C\\)"],
  ["\\(\\displaystyle\\int a^x\\,dx\\) =", "\\(\\frac{a^x}{\\ln a}+C\\)"],
  ["\\(\\displaystyle\\int \\sin x\\,dx\\) =", "\\(-\\cos x+C\\)"],
  ["\\(\\displaystyle\\int \\sin x\\,dx\\)", "\\(-\\cos x+C\\)"],
  ["\\(\\displaystyle\\int \\cos x\\,dx\\) =", "\\(\\sin x+C\\)"],
  ["\\(\\displaystyle\\int \\cos x\\,dx\\)", "\\(\\sin x+C\\)"],
  ["\\(\\displaystyle\\int \\frac1{\\cos^2 x}\\,dx\\) =", "\\(\\tan x+C\\)"],
  // 置換積分と定積分
  ["\\(\\displaystyle\\int_0^{\\pi/3}\\tan x\\,dx\\)", "\\(\\displaystyle=[-\\log\\cos x]_0^{\\pi/3}=\\log2\\)"],
  ["\\(\\displaystyle\\int \\frac1{1+x^2}\\,dx\\) =", "\\(\\arctan x+C\\)"],
  ["\\(\\displaystyle\\int_0^1 \\dfrac1{1+x^2}\\,dx\\)", "\\(\\displaystyle=\\arctan1-\\arctan0=\\dfrac\\pi4\\)"],
  ["\\displaystyle\\int (1+x^2)^{-3/2} dx", "\\(x=\\tan\\theta\\ \\left(-\\dfrac{\\pi}{2}<\\theta<\\dfrac{\\pi}{2}\\right)\\) とおくと\n与式 = \\displaystyle\\int \\left(\\dfrac1{\\cos^2\\theta}\\right)^{-3/2} \\dfrac1{\\cos^2\\theta}d\\theta\n=\\sin\\theta+C\n= \\displaystyle\\frac{x}{\\sqrt{1+x^2}}+C"],
  ["\\displaystyle \\int\\frac{dx}{\\sqrt{1-x^2}}","\\sin y=x\\space \\left(-\\dfrac{\\pi}{2}<y<\\dfrac{\\pi}{2}\\right)\\space を微分すると\n\\cos y\\,y'=1\\quad\\therefore y'=\\dfrac1{\\sqrt{1-x^2}}\\quadより\n答え\\space\\arcsin x+C"],
  ["\\(\\displaystyle\\int_0^1 xe^{x^2}\\,dx\\) =", "\\(\\displaystyle\\frac12\\int_0^1e^u\\,du=\\frac{e-1}2\\)"],
  ["\\(\\displaystyle\\int_0^1 2xe^{x^2}\\,dx\\)", "\\(\\displaystyle=\\int_0^1 e^u\\,du=e-1\\)"],
  ["\\(\\displaystyle\\int_0^1 \\dfrac{2x}{1+x^2}\\,dx\\)", "\\(\\displaystyle=\\int_1^2\\dfrac1u\\,du=\\log2\\)"],
  // 漸化式と特殊な積分
  ["\\(\\displaystyle\\int_0^{\\pi/2}\\sin^3x\\,dx\\) を求めよ。", "\\(\\sin^3x=\\sin x(1-\\cos^2x)\\) とし \\(u=\\cos x\\) とおくと、\n\\(\\displaystyle\\int_0^1(1-u^2)\\,du=1-\\frac13=\\frac23\\)"],
  ["n\\geqq1 とする\n\\displaystyle I_{2n} = \\int_0^{\\frac{\\pi}{2}}\\sin^{2n}x\\,dx", "\\displaystyle I_{2n} =[-\\cos x\\sin^{2n-1}x] \n+ (2n-1)\\int\\cos^2x\\sin^{2n-2}x\\,dx\n=(2n-1)(I_{2n-2}-I_{2n})\n=\\dfrac{2n-1}{2n}I_{2n-2}\n=\\dfrac{(2n-1)(2n-3)\\cdots1}{(2n)(2n-2)\\cdots2}\\cdot\\dfrac{\\pi}{2}"],
  ["\\(\\displaystyle\\int\\frac{dx}{x^2-1}\\) を求めよ。\nただし \\(x\\ne\\pm1\\) とする。", "\\(\\dfrac1{x^2-1}=\\dfrac12\\left(\\dfrac1{x-1}-\\dfrac1{x+1}\\right)\\) より\n\\(\\displaystyle\\frac12\\log\\left|\\frac{x-1}{x+1}\\right|+C\\)"],
  ["\\displaystyle \\int\\frac{dx}{\\sqrt{x^2-1}}","\\dfrac{d}{dx}\\log\\left|x+\\sqrt{x^2-1}\\right|=\\frac{1+\\frac{x}{\\sqrt{x^2-1}}}{x+\\sqrt{x^2-1}}\n=\\frac1{\\sqrt{x^2-1}} \\quad より\n答え\\space\\log\\left|x+\\sqrt{x^2-1}\\right|+C\\quad(|x|>1)"],
  ["x>0\\text{ とする}\\quad\n\\displaystyle \\int\\frac{\\sqrt{x^2+1}}{x}\\,dx", "t=\\sqrt{x^2+1}\\text{ とおくと}\\quad\\displaystyle dt=\\frac{x}{t}dx\n\\displaystyle\\int\\frac{t^2}{t^2-1}dt\n=\\displaystyle\\int\\left(1+\\frac12\\left(\\frac1{t-1}-\\frac1{t+1}\\right)\\right)dt\n=t+\\dfrac12\\log\\dfrac{t-1}{t+1}+C\n=\\space\\sqrt{x^2+1}+\\log x-\\log\\left(1+\\sqrt{x^2+1}\\right)+C"],
  // 部分積分
  ["\\(\\displaystyle\\int x\\cos x\\,dx\\)", "\\(\\displaystyle=x\\sin x-\\int\\sin x\\,dx\\)\n\\(\\displaystyle=x\\sin x+\\cos x+C\\)"],
  ["\\(\\displaystyle\\int x e^x\\,dx\\)", "\\(\\displaystyle=xe^x-\\int e^x\\,dx\\)\n\\(\\displaystyle=e^x(x-1)+C\\)"],
  ["\\(\\displaystyle\\int_0^\\pi x\\sin x\\,dx\\)", "\\(\\displaystyle=[-x\\cos x]_0^\\pi+\\int_0^\\pi\\cos x\\,dx\\)\n\\(\\displaystyle=\\pi\\)"],
  ["\\(\\displaystyle\\int_0^1x^2e^x\\,dx\\) を求めよ。", "部分積分を2回用いると原始関数は \\(e^x(x^2-2x+2)\\)。\nしたがって \\(\\left[e^x(x^2-2x+2)\\right]_0^1=e-2\\)"],
  // 面積・体積・重心
  ["\\(\\displaystyle\\int_0^1\\sqrt{1-x^2}\\,dx\\) を求めよ。", "\\(y=\\sqrt{1-x^2}\\) は単位円の第1象限の弧である。\n積分はその面積だから \\(\\dfrac\\pi4\\)"],
  ["曲線 \\(y=\\sqrt x\\ (0\\le x\\le1)\\) と \\(x\\) 軸で囲まれる部分を\n\\(x\\) 軸のまわりに回転してできる立体の体積を求めよ。", "円板の半径は \\(\\sqrt x\\) なので、\n体積は \\(\\displaystyle\\pi\\int_0^1(\\sqrt x)^2\\,dx=\\pi\\int_0^1x\\,dx=\\frac\\pi2\\)"],
  ["線分 \\(P=(1,t,t)\\ (-1\\le t\\le1)\\) を \\(z\\) 軸のまわりに回転してできる曲面と、\n平面 \\(z=-1,z=1\\) で囲まれる立体の体積を求めよ。", "高さ \\(z=t\\) で回転半径の2乗は \\(1+t^2\\)。\nしたがって体積は \\(\\displaystyle\\pi\\int_{-1}^1(1+t^2)\\,dt=\\frac{8\\pi}3\\)"],
  ["単位円の上半円周の重心の \\(y\\) 座標を求めよ。", "\\((x,y)=(\\cos\\theta,\\sin\\theta)\\ (0\\le\\theta\\le\\pi)\\) とおくと弧長要素は \\(d\\theta\\)。\nよって \\(\\bar y=\\dfrac{\\int_0^\\pi\\sin\\theta\\,d\\theta}{\\int_0^\\pi d\\theta}=\\dfrac2\\pi\\)"]
];
