# GitHub Pricing Calculator

A better GitHub pricing calculator that accurately compares plans based on your actual usage, helping you choose the most cost-effective option.

## Why This Calculator?

The official GitHub pricing calculator (https://github.com/pricing/calculator) has limitations:
- Allows selecting multiple mutually exclusive plans simultaneously (Enterprise, Teams, Pro)
- Doesn't accurately calculate costs based on plan limits and overages
- Doesn't recommend the best plan for your usage

## Features

### Smart Plan Comparison
- **Input your usage** - Set your expected usage across all GitHub services
- **See all plans** - Compare Free, Pro, Team, and Enterprise plans side-by-side
- **Get recommendations** - Automatically identifies the most cost-effective plan
- **Accurate calculations** - Includes all plan limits, multipliers, and overage costs

### Comprehensive Services Covered

#### GitHub Actions
- Accurately calculates minute usage with multipliers:
  - Ubuntu Linux: 1x multiplier
  - Windows: 2x multiplier
  - macOS: 10x multiplier
- Plan limits:
  - Free: 2,000 minutes/month (hard cap, cannot exceed)
  - Pro & Team: 3,000 minutes/month
  - Enterprise: 50,000 minutes/month
- Overage rates: Linux $0.008/min, Windows $0.016/min, macOS $0.08/min

#### GitHub Packages
- Storage and data transfer limits per plan
- Overage: $0.25/GB storage, $0.50/GB transfer

#### Git LFS
- Storage and bandwidth limits per plan
- Overage: $0.07/GB storage, $0.0875/GB bandwidth

#### GitHub Codespaces
- Core hours and storage limits
- Compute starting at $0.18/hour
- Storage at $0.07/GB/month

## Usage

Simply open `index.html` in your browser and:

1. **Configure Your Usage**
   - Set team size
   - Input GitHub Actions usage (jobs/day, duration, runner type)
   - Set package storage and transfer needs
   - Configure LFS requirements
   - Add Codespaces usage if applicable

2. **View Results**
   - See which plans support your usage
   - Compare costs across all plans
   - View detailed breakdowns of included vs. overage costs
   - Get a recommended plan based on best value

## Key Improvements Over Official Calculator

1. **No Multiple Plan Selection** - You can't accidentally select incompatible plans
2. **Usage-Based Comparison** - Input usage once, see all plan costs
3. **Accurate Multipliers** - Properly calculates GitHub Actions minute multipliers
4. **Hard Cap Detection** - Shows when Free plan can't support your usage
5. **Overage Transparency** - Clearly shows what's included vs. what costs extra
6. **Smart Recommendations** - Automatically suggests the best plan

## Pricing Sources

All pricing information is based on official GitHub documentation as of January 2025:
- [GitHub Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions)
- [Actions runner pricing](https://docs.github.com/en/billing/reference/actions-minute-multipliers)
- [GitHub Packages billing](https://docs.github.com/en/billing/concepts/product-billing/github-packages)
- [GitHub Pricing Plans](https://github.com/pricing)

## Technical Details

- Pure HTML/CSS/JavaScript - no dependencies
- Responsive design that works on mobile and desktop
- GitHub-inspired modern dark theme
- Real-time calculation updates

## License

See LICENSE file for details.
