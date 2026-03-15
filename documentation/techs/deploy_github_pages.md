import pypandoc

md_text = """
# GitHub Pages + Cloudflare Custom Domain (1‑Minute Setup)

## 1. Configure GitHub Pages
Go to:

Repository → **Settings → Pages**

Set **Custom domain**:

```
www.bytes-smith.com
```

GitHub will create a `CNAME` file in the repo root containing:

```
www.bytes-smith.com
```

---

## 2. Configure Cloudflare DNS

Add the following DNS records.

### Root domain
| Type | Name | Value |
|-----|-----|-----|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

Proxy status: **DNS only**

### Subdomain
| Type | Name | Value |
|-----|-----|-----|
| CNAME | www | pst-2016.github.io |

Proxy status: **DNS only**

---

## 3. Wait for DNS Check

GitHub may initially show:

```
DNS check unsuccessful
```

Wait a few minutes until it becomes:

```
DNS check successful
```

---

## 4. Enable HTTPS

Go to:

Settings → **Pages**

Enable:

```
Enforce HTTPS
```

GitHub will automatically generate the SSL certificate.

---

## Final DNS Structure

```
A      @      185.199.108.153
A      @      185.199.109.153
A      @      185.199.110.153
A      @      185.199.111.153
CNAME  www    pst-2016.github.io
```
"""

output_path = "/mnt/data/github-pages-cloudflare-quick-setup.md"
pypandoc.convert_text(md_text, "md", format="md", outputfile=output_path, extra_args=["--standalone"])

output_path
