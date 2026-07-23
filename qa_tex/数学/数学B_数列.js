// 数学B: 数列
const qa_数学B_数列 = [
  ["\\(\\text{等差数列 }a_n=a_1+(n-1)d\\text{ の和}\\)", "\\(\\displaystyle S_n=\\dfrac n2\\{2a_1+(n-1)d\\}\\)"],
  ["\\(\\displaystyle\\sum_{k=1}^n k\\)", "\\(\\displaystyle =\\dfrac{n(n+1)}2\\)"],
  ["\\(\\displaystyle\\sum_{k=1}^n k^2\\)", "\\(\\displaystyle =\\dfrac{n(n+1)(2n+1)}6\\)"],
  ["\\(\\displaystyle\\sum_{k=1}^n k^3\\)", "\\(\\displaystyle =\\left\\{\\dfrac{n(n+1)}2\\right\\}^2\\)"],
  ["\\(r\\ne1\\) とする\n\\(1+r+\\cdots+r^{n-1}=\\)", "\\(\\displaystyle \\frac{r^n-1}{r-1}\\)"],
  ["\\(\\text{等比数列 }a_n=a_1r^{n-1}\\text{ の和 }(r\\ne1)\\)", "\\(\\displaystyle S_n=a_1\\dfrac{r^n-1}{r-1}\\)"],
  ["\\(\\displaystyle S_n=\\sum_{k=1}^{n}k2^{k-1}\\) を求めよ。", "\\(2S_n-S_n=n2^n-(1+2+\\cdots+2^{n-1})\\) であり、括弧内は \\(2^n-1\\)。したがって \\(S_n=1+(n-1)2^n\\)"],
  ["\\(\\displaystyle \\sum_{k=1}^n\\frac1{k(k+1)}\\) =", "\\(\\displaystyle \\sum_{k=1}^n\\left(\\frac1k-\\frac1{k+1}\\right)=\\frac{n}{n+1}\\)"],
  ["\\(\\displaystyle\\sum_{k=1}^n\\{k(k+1)-(k-1)k\\}\\)", "\\(\\displaystyle =\\sum_{k=1}^n2k=n(n+1)\\)"],
  ["\\(\\displaystyle\\sum_{k=1}^{n}\\frac1{\\sqrt{k+1}+\\sqrt{k}}\\) を求めよ。", "分母を有理化すると \\(\\sqrt{k+1}-\\sqrt{k}\\)。したがって和は途中が消えて \\(\\sqrt{n+1}-1\\)"],
  ["\\(a_1=2,\\ a_{n+1}=3a_n-2\\) で定める数列の一般項を求めよ。", "\\(b_n=a_n-1\\) とおくと \\(b_{n+1}=3b_n,\\ b_1=1\\)。よって \\(b_n=3^{n-1}\\) から \\(a_n=3^{n-1}+1\\)"],
  ["\\(a_1=a_2=1,\\ a_{n+2}=a_{n+1}+a_n\\) とする。\\(\\displaystyle\\sum_{k=1}^{7}a_k\\) を求めよ。", "\\(a_k=a_{k+2}-a_{k+1}\\) より \\(\\displaystyle\\sum_{k=1}^{7}a_k=a_9-a_2=34-1=33\\)"],
  ["正の整数 \\(n\\) に対して \\(4^n-1\\) が \\(3\\) の倍数であることを数学的帰納法で示せ。", "\\(n=1\\) で成立。\\(4^k-1=3m\\) と仮定すると \\(4^{k+1}-1=4(4^k-1)+3=3(4m+1)\\) だから \\(n=k+1\\) でも成立"]
];
