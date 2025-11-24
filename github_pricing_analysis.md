# GitHub Pricing Analysis

## Executive Summary

GitHub uses a classic three-tier SaaS pricing model (Free/Team/Enterprise) with strategic feature gating designed to push organizations toward paid plans as they scale or require security/compliance features.

---

## Pricing Model Analysis

### Cost Per User Breakdown

| Tier | Monthly Cost | Annual Cost | Cost per 10 users/year |
|------|--------------|-------------|------------------------|
| Free | $0 | $0 | $0 |
| Team | $4/user | $48/user | $480 |
| Enterprise | $21/user | $252/user | $2,520 |

**Price jump analysis:**
- Free → Team: Infinite % increase (from $0)
- Team → Enterprise: **425% increase** ($4 → $21)

### Value Per Dollar (CI/CD Minutes)

| Tier | Minutes | Cost | Minutes per $ |
|------|---------|------|---------------|
| Free | 2,000 | $0 | ∞ |
| Team | 3,000 | $4 | 750 |
| Enterprise | 50,000 | $21 | 2,381 |

**Insight**: Enterprise provides **3.2x better value** per dollar for CI/CD minutes compared to Team tier.

### Value Per Dollar (Package Storage)

| Tier | Storage | Cost | MB per $ |
|------|---------|------|----------|
| Free | 500 MB | $0 | ∞ |
| Team | 2 GB | $4 | 512 |
| Enterprise | 50 GB | $21 | 2,438 |

**Insight**: Enterprise provides **4.8x better value** per dollar for storage compared to Team tier.

---

## Feature Gating Strategy Analysis

### Gate Type 1: "Public repos only" → Full access
Many features are free for public repos but require paid plans for private repos:
- Repository rules
- Code owners
- Draft pull requests
- Repository insights
- Pages and wikis

**Strategic intent**: Generous to open source community while monetizing enterprise/private use cases.

### Gate Type 2: Complete feature lockout
Features completely unavailable on lower tiers:

| Feature | First Available |
|---------|-----------------|
| Audit log | Team |
| Required reviewers | Team |
| Audit log API | Enterprise |
| SAML SSO | Enterprise |
| SCIM provisioning | Enterprise |
| Data residency | Enterprise |
| IP allow list | Enterprise |

### Gate Type 3: Add-on upsells
Security features available as add-ons for Team/Enterprise:
- GitHub Secret Protection
- GitHub Code Security
- Premium Support

**Pricing psychology**: Creates additional revenue opportunities beyond base tier pricing.

---

## Competitive Positioning Analysis

### Enterprise Compliance Features
GitHub Enterprise specifically targets regulated industries with:
- SOC1/SOC2 Type 2 reports
- FedRAMP Tailored ATO
- Data residency (EU, Australia)
- Advanced auditing
- IP allow lists

**Target market**: Financial services, healthcare, government contractors

### Developer Experience vs. Governance Trade-off

| Concern | Primary Tier |
|---------|--------------|
| Individual productivity | Free |
| Team collaboration | Team |
| Security & compliance | Enterprise |
| Self-hosting control | Enterprise Server |

---

## Segment Analysis

### Individual Developers / Open Source
**Recommended tier**: Free
- Unlimited public repos
- Full CI/CD for public repos (Actions minutes free)
- Copilot free tier (2,000 completions/month)
- Community support sufficient

### Small Teams (2-10 people)
**Recommended tier**: Team at $4/user
**Break-even calculation**:
- If team needs private repo collaboration features
- If web-based support is required
- Annual cost: $480-$4,800/year for team

### Mid-size Organizations (10-100 people)
**Recommended tier**: Team or Enterprise depending on:
- SAML/SSO requirement → Enterprise
- Compliance requirements → Enterprise
- Otherwise → Team

### Large Enterprises (100+ users)
**Recommended tier**: Enterprise
**At 100 users**:
- Team: $4,800/year
- Enterprise: $25,200/year
- **Premium**: $20,400/year for compliance, SSO, audit APIs, 16x CI/CD minutes

---

## Decision Framework

### When to Upgrade: Free → Team

| Trigger | Why |
|---------|-----|
| Need private repo code owners | Team collaboration |
| Need draft pull requests (private) | Code review workflow |
| Exceed 2,000 CI/CD minutes | Scale of automation |
| Need web-based support | Response time requirements |
| Need audit logging | Basic compliance |

### When to Upgrade: Team → Enterprise

| Trigger | Why |
|---------|-----|
| SSO/SAML requirement | IT security policy |
| SOC2 compliance needed | Customer contracts |
| Data residency required | Regulatory (GDPR, etc.) |
| Exceed 3,000 CI/CD minutes significantly | 50K vs 3K minutes |
| Need centralized enterprise management | Multiple organizations |
| Government contracts | FedRAMP requirement |

---

## Cost Optimization Strategies

### 1. Public Repository Strategy
- Keep open-source projects public for free CI/CD minutes
- Use private repos only for proprietary code
- Leverage "free for public repos" features

### 2. Right-sizing CI/CD
- 2,000 free minutes ≈ 33 hours/month
- 3,000 Team minutes ≈ 50 hours/month
- Optimize pipeline efficiency before upgrading tiers

### 3. Add-on Evaluation
Consider if security add-ons are needed vs. third-party alternatives:
- GitHub Secret Protection vs. GitGuardian, TruffleHog
- CodeQL vs. Snyk, SonarQube, Checkmarx

### 4. Enterprise Negotiation Points
For large deployments, negotiate on:
- Volume discounts
- Multi-year commitments
- Bundle Advanced Security
- Include Premium Support

---

## Key Insights Summary

1. **Free tier is genuinely generous** for open source and individual use
2. **Team tier is the "collaboration tax"** - required once you need serious private repo workflows
3. **Enterprise tier is the "compliance tax"** - required for regulated industries
4. **5.25x price jump** from Team to Enterprise indicates strong enterprise leverage
5. **Add-on strategy** creates significant upsell potential on security features
6. **CI/CD minutes scaling** heavily favors Enterprise (16.7x increase for 5.25x price)
7. **Public repo benefits** are a strategic moat against competitors
