Let $\ell \in \poly[\secp]$ and
$\prf: \set{0, 1}^{\secp} \times \set{0, 1}^{\ell(\secp)} \rightarrow \set{0, 1}^{\ell(\secp)}$ be
an efficiently computable keyed function. $\prf{}$ is a pseudorandom function if for all non-uniform
polynomial time distinguishers $\dist$ there exists a negligible function $\negl[\cdot]$ such that
for all $\secp \in \N$

$$
  \abs{\probsub{k \leftarrow \set{0, 1}^{\secp}}{\dist^{\prf(k, \cdot)}(1^\secp) = 1} - \probsub{f \leftarrow \mathsf{Func}_{\ell}}{\dist^{f(\cdot)}(1^\secp) = 1}} \le \negl[\secp]
$$

where $\mathsf{Func}_{\ell}$ is the set of all functions from $\ell(\secp)$ length bitstrings to
$\ell(\secp)$ length bitstrings.
