// 数学B: 数列
const qa_数学B_数列 = [
  ["\\displaystyle\\sum_{k=1}^n k", "\\displaystyle=\\dfrac{n(n+1)}2"],
  ["\\displaystyle\\sum_{k=1}^n k^2", "\\displaystyle=\\dfrac{n(n+1)(2n+1)}6"],
  ["\\displaystyle \\sum_{k=1}^{n}k^3 =", "\\displaystyle \\sum_{k=1}^{n}\\left(\\left\\{\\dfrac{k(k+1)}2\\right\\}^2 -\\left\\{\\dfrac{k(k-1)}2\\right\\}^2 \\right) = \\left\\{\\dfrac{n(n+1)}2\\right\\}^2"],
  ["\\(r\\ne1\\) とする\n1+r+\\cdots+r^{n-1}=", "\\displaystyle\\frac{r^n-1}{r-1}"],
  ["\\displaystyle S_n=\\sum_{k=1}^nk2^{k-1}", "\\(2S_n-S_n=n2^n-(1+2+\\cdots+2^{n-1})\\) であり、\n括弧内は \\(2^n-1\\)。\nしたがって \\(S_n=1+(n-1)2^n\\)"],
  ["\\(\\displaystyle\\sum_{k=1}^n\\frac1{k(k+1)}\\) =", "\\displaystyle\\sum_{k=1}^n\\left(\\frac1k-\\frac1{k+1}\\right)=\\frac n{n+1}"],
  ["\\displaystyle\\sum_{k=1}^n\\{k(k+1)-(k-1)k\\}", "\\displaystyle=\\sum_{k=1}^n2k=n(n+1)"],
  ["\\displaystyle\\sum_{k=1}^n\\frac1{\\sqrt{k+1}+\\sqrt{k}}", "= \\displaystyle\\sum_{k=1}^n\\left(\\sqrt{k+1}-\\sqrt{k}\\right)\n= \\sqrt{n+1}-1"],
  ["a_1=2\na_{n+1}=3a_n-2", "a_{n+1}-1=3\\left(a_n-1\\right)=3^n(a_1-1)\n\\therefore a_n = 3^{n-1}+1"],
  ["a_1=1\na_{n+1}=\\dfrac{a_n}{2+a_n}", "\\dfrac1{a_{n+1}}=\\dfrac2{a_n}+1\n\\therefore \\dfrac1{a_{n+1}}+1=2\\left(\\dfrac1{a_n}+1\\right)=2^{n+1}\n\\therefore a_n=\\dfrac1{2^n-1}"],
  ["a_1=a_2=1\na_{n+2}=a_{n+1}+a_n\n\\displaystyle\\sum_{k=1}^7a_k =", "\\{1,1,2,3,5,8,13,21,34\\}\n\\displaystyle \\sum_{k=1}^{7}a_{k+2}-a_{k+1} = a_9 - a_2\n= 33"],
  ["nは正の整数\n4^n-1 は 3 の倍数を証明", "n=1 で成立\n4^k-1=3m と仮定すると \n4^{k+1}-1=4(4^k-1)+3=3(4m+1)\nn=k+1 でも成立"],
];
