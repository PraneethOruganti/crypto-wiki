Let $\ell \in \poly[\secp]$. A digital signature scheme $\sig = (\Gen, \Sign, \Verify)$ is a tuple
of algorithms with the following syntax. \begin{itemize} \item
$\Gen(1^\secp) \rightarrow (\pk, \sk)$ is a $\ppt$ algorithm that outputs a public key $\pk$ and a
signing key $\sk$. \item $\Sign(\sk, m) \rightarrow \sigma$ is a $\ppt$ algorithm that takes the
signing key $\sk$ and a message $m \in \bin^{\ell(\secp)}$ as input and outputs a signature $\sigma$
on $m$. \item $\Verify(\pk, m, \sigma) \eqqcolon b$ is a polynomial time algorithm that takes the
public key $\pk$, a message $m \in \bin^{\ell(\secp)}$ and a signature $\sigma$ as input and outputs
a bit $b \in \bin$ denoting if $\sigma$ is valid. \end{itemize} We require that the signature scheme
satisfies the following properties. \begin{itemize} \item \textbf{Correctness:} For every
$\secp \in \N$ and every message $m \in \bin^{\ell(\secp)}$, we have \begin{equation*}
\prob{\Verify(\pk, m, \sigma) = 1 : \begin{array}{r} (\pk, \sk) \gets \Gen(1^\secp) \\ \sigma \gets
\Sign(\sk, m) \end{array}} = 1. \end{equation*}

    \item \textbf{Unforgeability:} For all $\secp \in \N$ and all non-uniform polynomial time adversaries $\adv$ we have
          \begin{equation*}
            \prob{\begin{array}{c}
                m \not\in \Sigma \quad \land \\
                \Verify(\pk, m, \sigma) = 1
              \end{array}:\begin{array}{r}
                (\pk, \sk) \gets \Gen(1^\secp) \\
                (m, \sigma) \gets \adv^{\Sign(\sk, \cdot)}(1^\secp, \pk)
              \end{array}} \le \negl[\secp]
          \end{equation*}
          where $\Sigma$ is the set of messages $\adv$ queries to its signing oracle $\Sign(\sk, \cdot)$.

\end{itemize}
