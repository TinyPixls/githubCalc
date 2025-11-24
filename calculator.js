// GitHub Pricing Configuration
const PRICING = {
    plans: {
        free: {
            name: 'Free',
            baseCost: 0,
            perUser: 0,
            actions: {
                includedMinutes: 2000,
                canExceed: false // Free plan has hard cap
            },
            packages: {
                storage: 0.5, // GB
                transfer: 1 // GB (free for public repos)
            },
            lfs: {
                storage: 10, // GB
                bandwidth: 10 // GB
            },
            codespaces: {
                coreHours: 120,
                storage: 15 // GB
            }
        },
        pro: {
            name: 'Pro',
            baseCost: 4,
            perUser: 4,
            actions: {
                includedMinutes: 3000,
                canExceed: true
            },
            packages: {
                storage: 2, // GB
                transfer: 10 // GB
            },
            lfs: {
                storage: 10, // GB
                bandwidth: 10 // GB
            },
            codespaces: {
                coreHours: 180,
                storage: 20 // GB
            }
        },
        team: {
            name: 'Team',
            baseCost: 0,
            perUser: 4,
            actions: {
                includedMinutes: 3000,
                canExceed: true
            },
            packages: {
                storage: 2, // GB
                transfer: 10 // GB
            },
            lfs: {
                storage: 250, // GB
                bandwidth: 250 // GB
            },
            codespaces: {
                coreHours: 0,
                storage: 0 // No free quota for organizations
            }
        },
        enterprise: {
            name: 'Enterprise',
            baseCost: 0,
            perUser: 21,
            actions: {
                includedMinutes: 50000,
                canExceed: true
            },
            packages: {
                storage: 50, // GB
                transfer: 100 // GB
            },
            lfs: {
                storage: 250, // GB
                bandwidth: 250 // GB
            },
            codespaces: {
                coreHours: 0,
                storage: 0 // No free quota for organizations
            }
        }
    },
    actions: {
        multipliers: {
            linux: 1,
            windows: 2,
            macos: 10
        },
        overageRates: { // Per minute
            linux: 0.008,
            windows: 0.016,
            macos: 0.08
        }
    },
    packages: {
        storageOverage: 0.25, // Per GB per month
        transferOverage: 0.50 // Per GB
    },
    lfs: {
        storageOverage: 0.07, // Per GB per month
        bandwidthOverage: 0.0875 // Per GB
    },
    codespaces: {
        baseCoreRate: 0.18, // Base rate per hour for 2-core machine
        coreMultipliers: {  // Hour multiplier based on cores
            2: 1,    // 2 cores = 1x = $0.18/hr
            4: 2,    // 4 cores = 2x = $0.36/hr
            8: 4,    // 8 cores = 4x = $0.72/hr
            16: 8,   // 16 cores = 8x = $1.44/hr
            32: 16   // 32 cores = 16x = $2.88/hr
        },
        storageRate: 0.07 // Per GB per month
    },
    ghas: {
        codeSecurity: 30.00, // Per committer per month
        secretProtection: 19.00 // Per committer per month
    },
    copilot: {
        individualFree: 0,
        individualPro: 10,
        individualProPlus: 39,
        orgBusiness: 19, // Per developer per month
        orgEnterprise: 39, // Per developer per month
        overageRate: 0.04 // Per request
    }
};

// GHAS feature requirements mapping
const GHAS_REQUIREMENTS = {
    // Secret Protection features
    'feature-push-protection': 'secretProtection',
    'feature-secret-scanning': 'secretProtection',
    'feature-provider-patterns': 'secretProtection',
    'feature-validity-checks': 'secretProtection',
    'feature-copilot-secret-scanning': 'secretProtection',
    'feature-generic-patterns': 'secretProtection',
    'feature-custom-patterns': 'secretProtection',
    'feature-push-protection-bypass': 'secretProtection',
    'feature-security-insights': 'secretProtection',
    'feature-scan-history-api': 'secretProtection',
    // Code Security features
    'feature-copilot-autofix': 'codeSecurity',
    'feature-third-party-extensibility': 'codeSecurity',
    'feature-contextual-vuln': 'codeSecurity',
    'feature-codeql': 'codeSecurity',
    'feature-security-campaigns': 'codeSecurity',
    'feature-dependabot-custom-rules': 'codeSecurity'
};

// Feature availability by plan
const FEATURE_AVAILABILITY = {
    'feature-repo-rules': { free: 'public', pro: true, team: true, enterprise: true, name: 'Repository rules' },
    'feature-code-owners': { free: 'public', pro: true, team: true, enterprise: true, name: 'Code owners' },
    'feature-draft-pr': { free: 'public', pro: true, team: true, enterprise: true, name: 'Draft pull requests' },
    'feature-multiple-pr-assignees': { free: 'public', pro: true, team: true, enterprise: true, name: 'Multiple PR assignees' },
    'feature-repository-insights': { free: 'public', pro: true, team: true, enterprise: true, name: 'Repository insights' },
    'feature-scheduled-reminders': { free: 'public', pro: true, team: true, enterprise: true, name: 'Scheduled reminders' },
    'feature-auto-code-review': { free: 'public', pro: true, team: true, enterprise: true, name: 'Automatic code review assignment' },
    'feature-environment-protection': { free: 'public', pro: 'public', team: 'public', enterprise: true, name: 'Environment protection rules' },
    'feature-environment-deployment': { free: false, pro: true, team: true, enterprise: true, name: 'Environment deployment branches' },
    'feature-multiple-reviewers': { free: false, pro: true, team: true, enterprise: true, name: 'Multiple reviewers' },
    'feature-required-reviewers': { free: false, pro: true, team: true, enterprise: true, name: 'Required reviewers' },
    'feature-pages-wikis': { free: 'public', pro: true, team: true, enterprise: true, name: 'Pages and wikis' },
    'feature-multiple-issue-assignees': { free: 'public', pro: true, team: true, enterprise: true, name: 'Multiple issue assignees' },
    'feature-push-protection': { free: 'public', pro: 'addon', team: 'addon', enterprise: 'addon', name: 'Push protection' },
    'feature-secret-scanning': { free: 'public', pro: 'addon', team: 'addon', enterprise: 'addon', name: 'Secret scanning' },
    'feature-provider-patterns': { free: 'public', pro: 'addon', team: 'addon', enterprise: 'addon', name: 'Provider patterns' },
    'feature-validity-checks': { free: false, pro: 'addon', team: 'addon', enterprise: 'addon', name: 'Validity checks' },
    'feature-copilot-secret-scanning': { free: false, pro: 'addon', team: 'addon', enterprise: 'addon', name: 'Copilot secret scanning' },
    'feature-generic-patterns': { free: false, pro: 'addon', team: 'addon', enterprise: 'addon', name: 'Generic patterns' },
    'feature-custom-patterns': { free: false, pro: 'addon', team: 'addon', enterprise: 'addon', name: 'Custom patterns' },
    'feature-push-protection-bypass': { free: false, pro: 'addon', team: 'addon', enterprise: 'addon', name: 'Push protection bypass controls' },
    'feature-security-insights': { free: false, pro: 'addon', team: 'addon', enterprise: 'addon', name: 'Security insights' },
    'feature-scan-history-api': { free: false, pro: 'addon', team: 'addon', enterprise: 'addon', name: 'Scan history API' },
    'feature-copilot-autofix': { free: 'public', pro: 'addon', team: 'addon', enterprise: 'addon', name: 'Copilot Autofix' },
    'feature-third-party-extensibility': { free: 'public', pro: 'addon', team: 'addon', enterprise: 'addon', name: 'Third party extensibility' },
    'feature-contextual-vuln': { free: 'public', pro: 'addon', team: 'addon', enterprise: 'addon', name: 'Contextual vulnerability intelligence' },
    'feature-codeql': { free: 'public', pro: 'addon', team: 'addon', enterprise: 'addon', name: 'CodeQL' },
    'feature-security-campaigns': { free: false, pro: 'addon', team: 'addon', enterprise: 'addon', name: 'Security campaigns' },
    'feature-dependabot-custom-rules': { free: false, pro: 'addon', team: 'addon', enterprise: 'addon', name: 'Dependabot custom auto-triage rules' },
    'feature-artifact-attestations': { free: 'public', pro: 'public', team: 'public', enterprise: true, name: 'Artifact attestations' },
    'feature-required-2fa': { free: true, pro: true, team: true, enterprise: true, name: 'Required 2FA' },
    'feature-audit-log': { free: false, pro: true, team: true, enterprise: true, name: 'Audit log' },
    'feature-audit-log-api': { free: false, pro: false, team: false, enterprise: true, name: 'Audit log API' },
    'feature-github-connect': { free: false, pro: false, team: false, enterprise: true, name: 'GitHub Connect' },
    'feature-saml-sso': { free: false, pro: false, team: false, enterprise: true, name: 'SAML SSO' },
    'feature-ldap': { free: false, pro: false, team: false, enterprise: 'server', name: 'LDAP' },
    'feature-ip-allow-list': { free: false, pro: false, team: false, enterprise: 'cloud', name: 'IP allow list' },
    'feature-data-residency': { free: false, pro: false, team: false, enterprise: true, name: 'Data residency' },
    'feature-emu': { free: false, pro: false, team: false, enterprise: true, name: 'Enterprise Managed Users' },
    'feature-scim': { free: false, pro: false, team: false, enterprise: true, name: 'User provisioning (SCIM)' },
    'feature-enterprise-account': { free: false, pro: false, team: false, enterprise: true, name: 'Enterprise Account' },
    'feature-soc-reports': { free: false, pro: false, team: false, enterprise: true, name: 'SOC1/SOC2 reports' },
    'feature-fedramp': { free: false, pro: false, team: false, enterprise: true, name: 'FedRAMP Tailored ATO' },
    'feature-pre-receive-hooks': { free: false, pro: false, team: false, enterprise: 'server', name: 'Pre-receive hooks' },
    'feature-standard-support': { free: false, pro: true, team: true, enterprise: true, name: 'Standard Support' },
    'feature-premium-support': { free: false, pro: false, team: false, enterprise: 'addon', name: 'Premium Support' },
    'feature-invoice-billing': { free: false, pro: false, team: false, enterprise: true, name: 'Invoice billing' },
    'feature-self-hosted': { free: false, pro: false, team: false, enterprise: 'server', name: 'Self-hosted deployment' }
};

class GitHubPricingCalculator {
    constructor() {
        this.usage = {};
        this.results = {};
        this.runners = [];
        this.runnerIdCounter = 0;
        this.codespaces = [];
        this.codespaceIdCounter = 0;
        this.debouncedCalculate = this.debounce(() => this.calculate(), 300);
        this.initEventListeners();
        this.addRunner(); // Add initial runner
        this.addCodespace(); // Add initial codespace machine
    }

    // Debounce utility function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    initEventListeners() {
        const calculateBtn = document.getElementById('calculate-btn');
        calculateBtn.addEventListener('click', () => this.calculate());

        const addRunnerBtnBottom = document.getElementById('add-runner-btn-bottom');
        addRunnerBtnBottom.addEventListener('click', () => this.addRunner());

        const addCodespaceBtnBottom = document.getElementById('add-codespace-btn-bottom');
        addCodespaceBtnBottom.addEventListener('click', () => this.addCodespace());

        // Section collapse/expand with checkboxes
        document.querySelectorAll('.section-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const section = checkbox.closest('.section');
                if (checkbox.checked) {
                    section.classList.remove('collapsed');
                    // Reset accordion state - expand content when section is enabled
                    section.classList.remove('content-collapsed');
                    const summary = section.querySelector('.section-summary');
                    if (summary) {
                        summary.style.display = 'none';
                    }
                } else {
                    section.classList.add('collapsed');
                }
                // Trigger validation and recalculation when section is toggled
                this.validateFields();
                this.calculate();
            });
        });

        // Auto-calculate on input change (debounced for text inputs, immediate for selects/checkboxes)
        document.addEventListener('input', (e) => {
            if (e.target.matches('input[type="number"], input[type="text"]')) {
                this.debouncedCalculate();
            }
        });

        document.addEventListener('change', (e) => {
            if (e.target.matches('select, input[type="radio"], input[type="checkbox"]')) {
                this.calculate();
            }
        });

        // Team size change listener for Copilot plan validation
        const usersInput = document.getElementById('users');
        usersInput.addEventListener('input', () => {
            this.updateCopilotPlanAvailability();
            this.validateFields();
            this.debouncedCalculate();
        });

        // Copilot users change listener
        const copilotUsersInput = document.getElementById('copilot-users');
        copilotUsersInput.addEventListener('input', () => {
            this.updateCopilotPlanAvailability();
            this.validateFields();
            this.debouncedCalculate();
        });

        // GHAS committers validation listener
        const ghasCommittersInput = document.getElementById('ghas-committers');
        ghasCommittersInput.addEventListener('input', () => {
            this.validateFields();
            this.debouncedCalculate();
        });

        // Initialize Copilot plan availability and validation
        this.updateCopilotPlanAvailability();
        this.validateFields();

        // Section content collapse/expand functionality
        document.querySelectorAll('.collapse-chevron').forEach(button => {
            button.addEventListener('click', (e) => {
                const section = e.target.closest('.section');
                const summary = section.querySelector('.section-summary');
                section.classList.toggle('content-collapsed');

                // Show/hide summary
                if (section.classList.contains('content-collapsed')) {
                    summary.style.display = 'block';
                    this.updateSectionSummary(section);
                } else {
                    summary.style.display = 'none';
                }
            });
        });

        // Add event listeners to feature checkboxes
        for (const featureId in FEATURE_AVAILABILITY) {
            const checkbox = document.getElementById(featureId);
            if (checkbox) {
                checkbox.addEventListener('change', () => {
                    this.calculate();
                });
            }
        }
    }

    updateSectionSummary(section) {
        const sectionType = section.dataset.section;
        const summaryElement = section.querySelector('.section-summary span');

        if (!summaryElement) return;

        // Check if section is enabled
        const checkbox = section.querySelector('.section-checkbox');
        if (!checkbox || !checkbox.checked) {
            summaryElement.textContent = 'Not configured';
            return;
        }

        // Generate summary based on section type
        switch (sectionType) {
            case 'copilot':
                this.updateCopilotSummary(summaryElement);
                break;
            case 'actions':
                this.updateActionsSummary(summaryElement);
                break;
            case 'codespaces':
                this.updateCodespacesSummary(summaryElement);
                break;
            case 'packages':
                this.updatePackagesSummary(summaryElement);
                break;
            case 'lfs':
                this.updateLFSSummary(summaryElement);
                break;
            case 'ghas':
                this.updateGHASSummary(summaryElement);
                break;
            case 'other-features':
                this.updateOtherFeaturesSummary(summaryElement);
                break;
            default:
                summaryElement.textContent = 'Not configured';
        }
    }

    updateCopilotSummary(element) {
        const copilotUsers = parseInt(document.getElementById('copilot-users').value) || 0;
        const teamSize = parseInt(document.getElementById('users').value) || 1;
        const effectiveUsers = copilotUsers > 0 ? copilotUsers : teamSize;
        const selectedPlan = document.querySelector('input[name="copilot-plan"]:checked');
        const overageRequests = parseInt(document.getElementById('copilot-overage-requests').value) || 0;

        if (!selectedPlan) {
            element.textContent = 'Not configured';
            return;
        }

        const planNames = {
            'individual-free': 'Individual Free',
            'individual-pro': 'Individual Pro',
            'individual-pro-plus': 'Individual Pro+',
            'org-business': 'Business',
            'org-enterprise': 'Enterprise'
        };

        const planName = planNames[selectedPlan.value] || 'Unknown';
        const userText = effectiveUsers > 1 ? `${effectiveUsers} users` : '1 user';

        let summary = `${planName} plan for ${userText}`;
        if (overageRequests > 0) {
            summary += `, ${overageRequests.toLocaleString()} overage requests`;
        }
        element.textContent = summary;
    }

    updateActionsSummary(element) {
        const runnerCount = this.runners.length;

        if (runnerCount === 0) {
            element.textContent = 'Not configured';
            return;
        }

        // Count configured runners (those with jobs and duration)
        let configuredCount = 0;
        let totalJobs = 0;

        this.runners.forEach(runnerId => {
            const jobsInput = document.getElementById(`runner-${runnerId}-jobs`);
            const durationInput = document.getElementById(`runner-${runnerId}-duration`);

            if (jobsInput && durationInput) {
                const jobs = parseInt(jobsInput.value) || 0;
                const duration = parseInt(durationInput.value) || 0;

                if (jobs > 0 && duration > 0) {
                    configuredCount++;
                    totalJobs += jobs;
                }
            }
        });

        if (configuredCount === 0) {
            element.textContent = `${runnerCount} runner${runnerCount > 1 ? 's' : ''} added, none configured`;
        } else {
            const runnerText = configuredCount === 1 ? 'runner' : 'runners';
            const jobText = totalJobs === 1 ? 'job' : 'jobs';
            element.textContent = `${configuredCount} ${runnerText}, ${totalJobs} ${jobText}/day`;
        }
    }

    updateCodespacesSummary(element) {
        const machineCount = this.codespaces.length;
        const storedCodespaces = parseInt(document.getElementById('stored-codespaces').value) || 0;
        const avgProjectSize = parseFloat(document.getElementById('avg-project-size').value) || 0;

        if (machineCount === 0 && storedCodespaces === 0 && avgProjectSize === 0) {
            element.textContent = 'Not configured';
            return;
        }

        // Count configured machines
        let configuredCount = 0;
        let totalDevelopers = 0;

        this.codespaces.forEach(codespaceId => {
            const developersInput = document.getElementById(`codespace-${codespaceId}-developers`);
            const hoursInput = document.getElementById(`codespace-${codespaceId}-hours`);

            if (developersInput && hoursInput) {
                const developers = parseInt(developersInput.value) || 0;
                const hours = parseFloat(hoursInput.value) || 0;

                if (developers > 0 && hours > 0) {
                    configuredCount++;
                    totalDevelopers += developers;
                }
            }
        });

        let summary = '';
        if (configuredCount > 0) {
            const machineText = configuredCount === 1 ? 'machine' : 'machines';
            summary = `${configuredCount} ${machineText}, ${totalDevelopers} developer${totalDevelopers > 1 ? 's' : ''}`;
        } else if (machineCount > 0) {
            summary = `${machineCount} machine${machineCount > 1 ? 's' : ''} added, none configured`;
        } else {
            summary = 'Storage only';
        }

        if (storedCodespaces > 0 || avgProjectSize > 0) {
            summary += ` • Storage: ${storedCodespaces} codespaces, ${avgProjectSize} GB avg`;
        }

        element.textContent = summary;
    }

    updatePackagesSummary(element) {
        const storage = parseFloat(document.getElementById('package-storage').value) || 0;
        const transfer = parseFloat(document.getElementById('package-transfer').value) || 0;

        if (storage === 0 && transfer === 0) {
            element.textContent = 'Not configured';
            return;
        }

        const parts = [];
        if (storage > 0) parts.push(`${storage} GB storage`);
        if (transfer > 0) parts.push(`${transfer} GB transfer/month`);

        element.textContent = parts.join(', ');
    }

    updateLFSSummary(element) {
        const storage = parseFloat(document.getElementById('lfs-storage').value) || 0;
        const bandwidth = parseFloat(document.getElementById('lfs-bandwidth').value) || 0;

        if (storage === 0 && bandwidth === 0) {
            element.textContent = 'Not configured';
            return;
        }

        const parts = [];
        if (storage > 0) parts.push(`${storage} GiB storage`);
        if (bandwidth > 0) parts.push(`${bandwidth} GiB bandwidth/month`);

        element.textContent = parts.join(', ');
    }

    updateGHASSummary(element) {
        const committers = parseInt(document.getElementById('ghas-committers').value) || 0;
        const codeSecurity = document.getElementById('ghas-code-security').checked;
        const secretProtection = document.getElementById('ghas-secret-protection').checked;
        const teamSize = parseInt(document.getElementById('users').value) || 1;

        if (!codeSecurity && !secretProtection) {
            element.textContent = 'Not configured';
            return;
        }

        // Use team size as fallback if committers not specified
        const effectiveCommitters = (committers === 0 && (codeSecurity || secretProtection)) ? teamSize : committers;

        if (effectiveCommitters === 0) {
            element.textContent = 'Not configured';
            return;
        }

        const products = [];
        if (codeSecurity) products.push('Code Security');
        if (secretProtection) products.push('Secret Protection');

        const committerText = effectiveCommitters === 1 ? 'committer' : 'committers';
        const fallbackNote = committers === 0 ? ' (using team size)' : '';
        element.textContent = `${effectiveCommitters} ${committerText}${fallbackNote} • ${products.join(' + ')}`;
    }

    updateOtherFeaturesSummary(element) {
        const selectedFeatures = this.getSelectedFeatures();

        if (selectedFeatures.length === 0) {
            element.textContent = 'Not configured';
            return;
        }

        const featureText = selectedFeatures.length === 1 ? 'feature' : 'features';
        element.textContent = `${selectedFeatures.length} ${featureText} selected`;
    }

    getSelectedFeatures() {
        const selectedFeatures = [];
        for (const featureId in FEATURE_AVAILABILITY) {
            const checkbox = document.getElementById(featureId);
            if (checkbox && checkbox.checked) {
                selectedFeatures.push(featureId);
            }
        }
        return selectedFeatures;
    }

    validateFields() {
        const teamSize = parseInt(document.getElementById('users').value) || 0;
        const teamSizeInput = document.getElementById('users');

        // Check if any sections are enabled but team size is not set
        const anySectionEnabled = this.hasAnyFeaturesEnabled();
        const teamSizeWarning = document.getElementById('team-size-warning');

        if (anySectionEnabled && teamSize === 0 && teamSizeWarning) {
            teamSizeWarning.style.display = 'block';
            teamSizeInput.classList.add('has-warning');
        } else if (teamSizeWarning) {
            teamSizeWarning.style.display = 'none';
            teamSizeInput.classList.remove('has-warning');
        }

        // Validate Copilot users
        const copilotUsersInput = document.getElementById('copilot-users');
        const copilotUsers = parseInt(copilotUsersInput.value) || 0;
        const copilotUsersError = document.getElementById('copilot-users-error');

        if (copilotUsers > teamSize && teamSize > 0) {
            copilotUsersError.style.display = 'block';
            copilotUsersInput.classList.add('has-error');
        } else {
            copilotUsersError.style.display = 'none';
            copilotUsersInput.classList.remove('has-error');
        }

        // Validate GHAS committers
        const ghasCommittersInput = document.getElementById('ghas-committers');
        const ghasCommitters = parseInt(ghasCommittersInput.value) || 0;
        const ghasCommittersError = document.getElementById('ghas-committers-error');

        if (ghasCommitters > teamSize && teamSize > 0) {
            ghasCommittersError.style.display = 'block';
            ghasCommittersInput.classList.add('has-error');
        } else {
            ghasCommittersError.style.display = 'none';
            ghasCommittersInput.classList.remove('has-error');
        }

        // Validate all codespace developers
        this.codespaces.forEach(codespaceId => {
            const developersInput = document.getElementById(`codespace-${codespaceId}-developers`);
            const developersError = document.getElementById(`codespace-${codespaceId}-developers-error`);
            if (developersInput && developersError) {
                const developers = parseInt(developersInput.value) || 0;
                if (developers > teamSize && teamSize > 0) {
                    developersError.style.display = 'block';
                    developersInput.classList.add('has-error');
                } else {
                    developersError.style.display = 'none';
                    developersInput.classList.remove('has-error');
                }
            }
        });
    }

    updateCopilotPlanAvailability() {
        const teamSize = parseInt(document.getElementById('users').value) || 1;
        const copilotUsers = parseInt(document.getElementById('copilot-users').value) || 0;
        const individualPlans = document.getElementById('copilot-individual-plans');
        const disabledMessage = document.getElementById('copilot-individual-disabled-message');
        const individualRadios = document.querySelectorAll('input[name="copilot-plan"][value^="individual-"]');

        // Use copilot users if specified (> 0), otherwise fall back to team size
        const effectiveCopilotUsers = copilotUsers > 0 ? copilotUsers : teamSize;

        // Disable individual plans only when effective copilot users > 1
        if (effectiveCopilotUsers > 1) {
            // Disable individual plans
            individualRadios.forEach(radio => {
                radio.disabled = true;
                if (radio.checked) {
                    radio.checked = false;
                }
            });
            disabledMessage.style.display = 'block';
            individualPlans.style.opacity = '0.5';
        } else {
            // Enable individual plans
            individualRadios.forEach(radio => {
                radio.disabled = false;
            });
            disabledMessage.style.display = 'none';
            individualPlans.style.opacity = '1';
        }
    }

    addRunner() {
        const runnerId = this.runnerIdCounter++;
        this.runners.push(runnerId);

        const container = document.getElementById('runners-container');
        const runnerCard = document.createElement('div');
        runnerCard.className = 'runner-card';
        runnerCard.id = `runner-${runnerId}`;

        runnerCard.innerHTML = `
            <div class="runner-header">
                <button type="button" class="btn-collapse" data-runner-id="${runnerId}">▼</button>
                <div class="runner-title-container">
                    <span class="runner-title">Runner #${runnerId + 1}</span>
                    <span class="runner-summary" id="runner-summary-${runnerId}"></span>
                </div>
                <button type="button" class="btn-remove" data-runner-id="${runnerId}">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                </button>
            </div>
            <div class="runner-inputs">
                <div class="input-group">
                    <label for="runner-${runnerId}-type">Runner Type</label>
                    <select id="runner-${runnerId}-type" data-runner-id="${runnerId}">
                        <option value="linux">Ubuntu Linux - $0.48 USD/hr</option>
                        <option value="windows">Windows - $0.96 USD/hr</option>
                        <option value="macos">macOS - $4.80 USD/hr</option>
                    </select>
                </div>
                <div class="input-group">
                    <label for="runner-${runnerId}-jobs">Jobs per Day</label>
                    <input type="number" id="runner-${runnerId}-jobs" data-runner-id="${runnerId}" placeholder="e.g. 10" min="0" max="1000">
                </div>
                <div class="input-group">
                    <label for="runner-${runnerId}-duration">Average Job Duration (minutes)</label>
                    <input type="number" id="runner-${runnerId}-duration" data-runner-id="${runnerId}" placeholder="e.g. 5" min="0" max="360">
                </div>
            </div>
        `;

        container.appendChild(runnerCard);

        // Add collapse listener
        const collapseBtn = runnerCard.querySelector('.btn-collapse');
        collapseBtn.addEventListener('click', () => {
            runnerCard.classList.toggle('collapsed');
            collapseBtn.textContent = runnerCard.classList.contains('collapsed') ? '▶' : '▼';
        });

        // Add remove listener
        const removeBtn = runnerCard.querySelector('.btn-remove');
        removeBtn.addEventListener('click', () => this.removeRunner(runnerId));

        // Add input listeners to update summary
        const typeSelect = runnerCard.querySelector(`#runner-${runnerId}-type`);
        const jobsInput = runnerCard.querySelector(`#runner-${runnerId}-jobs`);
        const durationInput = runnerCard.querySelector(`#runner-${runnerId}-duration`);

        const updateSummary = () => this.updateRunnerSummary(runnerId);
        typeSelect.addEventListener('change', () => {
            updateSummary();
            this.calculate();
        });
        jobsInput.addEventListener('input', () => {
            updateSummary();
            this.debouncedCalculate();
        });
        durationInput.addEventListener('input', () => {
            updateSummary();
            this.debouncedCalculate();
        });

        // Initialize summary
        this.updateRunnerSummary(runnerId);

        this.calculate();
    }

    updateRunnerSummary(runnerId) {
        const typeSelect = document.getElementById(`runner-${runnerId}-type`);
        const jobsInput = document.getElementById(`runner-${runnerId}-jobs`);
        const durationInput = document.getElementById(`runner-${runnerId}-duration`);
        const summaryElement = document.getElementById(`runner-summary-${runnerId}`);

        if (!typeSelect || !jobsInput || !durationInput || !summaryElement) return;

        const jobs = parseInt(jobsInput.value) || 0;
        const duration = parseInt(durationInput.value) || 0;
        const type = typeSelect.value;

        if (jobs > 0 && duration > 0) {
            const typeDisplay = type === 'linux' ? 'Ubuntu Linux' :
                               type === 'windows' ? 'Windows' : 'macOS';
            summaryElement.textContent = `${jobs} jobs/day of ${duration} min each on ${typeDisplay}`;
        } else {
            summaryElement.textContent = 'Not configured';
        }
    }

    removeRunner(runnerId) {
        const index = this.runners.indexOf(runnerId);
        if (index > -1) {
            this.runners.splice(index, 1);
        }

        const runnerCard = document.getElementById(`runner-${runnerId}`);
        if (runnerCard) {
            // Add removing class for animation
            runnerCard.classList.add('removing');

            // Wait for animation to complete before removing
            setTimeout(() => {
                runnerCard.remove();

                // Reset counter if all runners are removed
                if (this.runners.length === 0) {
                    this.runnerIdCounter = 0;
                }

                this.calculate();
            }, 300); // Match the animation duration
        } else {
            // Reset counter if all runners are removed
            if (this.runners.length === 0) {
                this.runnerIdCounter = 0;
            }

            this.calculate();
        }
    }

    addCodespace() {
        const codespaceId = this.codespaceIdCounter++;
        this.codespaces.push(codespaceId);

        const container = document.getElementById('codespaces-container');
        const codespaceCard = document.createElement('div');
        codespaceCard.className = 'runner-card';
        codespaceCard.id = `codespace-${codespaceId}`;

        codespaceCard.innerHTML = `
            <div class="runner-header">
                <button type="button" class="btn-collapse" data-codespace-id="${codespaceId}">▼</button>
                <div class="runner-title-container">
                    <span class="runner-title">Machine #${codespaceId + 1}</span>
                    <span class="runner-summary" id="codespace-summary-${codespaceId}"></span>
                </div>
                <button type="button" class="btn-remove" data-codespace-id="${codespaceId}">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                </button>
            </div>
            <div class="runner-inputs">
                <div class="input-group">
                    <label for="codespace-${codespaceId}-cores">Machine Type</label>
                    <select id="codespace-${codespaceId}-cores" data-codespace-id="${codespaceId}">
                        <option value="2">2 cores, 8GB RAM ($0.18/hr)</option>
                        <option value="4">4 cores, 16GB RAM ($0.36/hr)</option>
                        <option value="8">8 cores, 32GB RAM ($0.72/hr)</option>
                        <option value="16">16 cores, 64GB RAM ($1.44/hr)</option>
                        <option value="32">32 cores, 128GB RAM ($2.88/hr)</option>
                    </select>
                </div>
                <div class="input-group">
                    <label for="codespace-${codespaceId}-developers">Number of Developers</label>
                    <input type="number" id="codespace-${codespaceId}-developers" data-codespace-id="${codespaceId}" placeholder="e.g. 1" min="0" max="1000">
                    <span class="validation-error" id="codespace-${codespaceId}-developers-error" style="display: none;">Cannot exceed team size</span>
                </div>
                <div class="input-group">
                    <label for="codespace-${codespaceId}-hours">Hours per Week per Developer</label>
                    <input type="number" id="codespace-${codespaceId}-hours" data-codespace-id="${codespaceId}" placeholder="e.g. 20" min="0" max="168">
                </div>
            </div>
        `;

        container.appendChild(codespaceCard);

        // Add collapse listener
        const collapseBtn = codespaceCard.querySelector('.btn-collapse');
        collapseBtn.addEventListener('click', () => {
            codespaceCard.classList.toggle('collapsed');
            collapseBtn.textContent = codespaceCard.classList.contains('collapsed') ? '▶' : '▼';
        });

        const removeBtn = codespaceCard.querySelector('.btn-remove');
        removeBtn.addEventListener('click', () => this.removeCodespace(codespaceId));

        // Add input listeners to update summary
        const coresSelect = codespaceCard.querySelector(`#codespace-${codespaceId}-cores`);
        const developersInput = codespaceCard.querySelector(`#codespace-${codespaceId}-developers`);
        const hoursInput = codespaceCard.querySelector(`#codespace-${codespaceId}-hours`);

        const updateSummary = () => this.updateCodespaceSummary(codespaceId);
        coresSelect.addEventListener('change', () => {
            updateSummary();
            this.calculate();
        });
        developersInput.addEventListener('input', () => {
            updateSummary();
            this.validateFields();
            this.debouncedCalculate();
        });
        hoursInput.addEventListener('input', () => {
            updateSummary();
            this.debouncedCalculate();
        });

        // Initialize summary and validation
        this.updateCodespaceSummary(codespaceId);
        this.validateFields();

        this.calculate();
    }

    updateCodespaceSummary(codespaceId) {
        const coresSelect = document.getElementById(`codespace-${codespaceId}-cores`);
        const developersInput = document.getElementById(`codespace-${codespaceId}-developers`);
        const hoursInput = document.getElementById(`codespace-${codespaceId}-hours`);
        const summaryElement = document.getElementById(`codespace-summary-${codespaceId}`);

        if (!coresSelect || !developersInput || !hoursInput || !summaryElement) return;

        const developers = parseInt(developersInput.value) || 0;
        const hours = parseFloat(hoursInput.value) || 0;
        const cores = parseInt(coresSelect.value);

        if (developers > 0 && hours > 0) {
            const developerText = developers === 1 ? 'developer' : 'developers';
            const hoursText = hours === 1 ? 'hr' : 'hrs';
            summaryElement.textContent = `${developers} ${developerText}, ${hours} ${hoursText}/week on ${cores}-core machine`;
        } else {
            summaryElement.textContent = 'Not configured';
        }
    }

    removeCodespace(codespaceId) {
        const index = this.codespaces.indexOf(codespaceId);
        if (index > -1) {
            this.codespaces.splice(index, 1);
        }

        const codespaceCard = document.getElementById(`codespace-${codespaceId}`);
        if (codespaceCard) {
            // Add removing class for animation
            codespaceCard.classList.add('removing');

            // Wait for animation to complete before removing
            setTimeout(() => {
                codespaceCard.remove();

                // Reset counter if all codespaces are removed
                if (this.codespaces.length === 0) {
                    this.codespaceIdCounter = 0;
                }

                this.calculate();
            }, 300); // Match the animation duration
        } else {
            // Reset counter if all codespaces are removed
            if (this.codespaces.length === 0) {
                this.codespaceIdCounter = 0;
            }

            this.calculate();
        }
    }

    getUsageInputs() {
        // Check which sections are enabled (team size is always enabled)
        const copilotEnabled = document.getElementById('toggle-copilot').checked;
        const actionsEnabled = document.getElementById('toggle-actions').checked;
        const packagesEnabled = document.getElementById('toggle-packages').checked;
        const lfsEnabled = document.getElementById('toggle-lfs').checked;
        const codespacesEnabled = document.getElementById('toggle-codespaces').checked;
        const ghasEnabled = document.getElementById('toggle-ghas').checked;
        const otherFeaturesEnabled = document.getElementById('toggle-other-features').checked;

        // Get runner configs only if Actions is enabled
        const runnerConfigs = actionsEnabled ? this.runners.map(runnerId => {
            const typeSelect = document.getElementById(`runner-${runnerId}-type`);
            const jobsInput = document.getElementById(`runner-${runnerId}-jobs`);
            const durationInput = document.getElementById(`runner-${runnerId}-duration`);

            return {
                type: typeSelect ? typeSelect.value : 'linux',
                jobsPerDay: jobsInput ? (parseInt(jobsInput.value) || 0) : 0,
                duration: durationInput ? (parseInt(durationInput.value) || 0) : 0
            };
        }) : [];

        // Get codespace configs only if Codespaces is enabled
        const codespaceConfigs = codespacesEnabled ? this.codespaces.map(codespaceId => {
            const coresSelect = document.getElementById(`codespace-${codespaceId}-cores`);
            const developersInput = document.getElementById(`codespace-${codespaceId}-developers`);
            const hoursInput = document.getElementById(`codespace-${codespaceId}-hours`);

            return {
                cores: coresSelect ? parseInt(coresSelect.value) : 2,
                developers: developersInput ? (parseInt(developersInput.value) || 0) : 0,
                hoursPerWeek: hoursInput ? (parseFloat(hoursInput.value) || 0) : 0
            };
        }) : [];

        // Get selected Copilot plan
        const copilotPlanRadio = copilotEnabled ? document.querySelector('input[name="copilot-plan"]:checked') : null;
        const copilotPlan = copilotPlanRadio ? copilotPlanRadio.value : null;

        const users = parseInt(document.getElementById('users').value) || 1;
        const ghasCommittersInput = ghasEnabled ? (parseInt(document.getElementById('ghas-committers').value) || 0) : 0;
        const ghasCodeSecurityChecked = ghasEnabled ? document.getElementById('ghas-code-security').checked : false;
        const ghasSecretProtectionChecked = ghasEnabled ? document.getElementById('ghas-secret-protection').checked : false;

        // Use team size as fallback for GHAS committers if not specified but GHAS is enabled
        const effectiveGhasCommitters = (ghasEnabled && (ghasCodeSecurityChecked || ghasSecretProtectionChecked) && ghasCommittersInput === 0)
            ? users
            : ghasCommittersInput;

        return {
            users: users,
            copilotPlan: copilotPlan,
            copilotUsers: copilotEnabled ? (parseInt(document.getElementById('copilot-users').value) || 0) : 0,
            copilotOverageRequests: copilotEnabled ? (parseInt(document.getElementById('copilot-overage-requests').value) || 0) : 0,
            runners: runnerConfigs,
            publicRepos: actionsEnabled ? document.getElementById('public-repos').checked : false,
            packageStorage: packagesEnabled ? (parseFloat(document.getElementById('package-storage').value) || 0) : 0,
            packageTransfer: packagesEnabled ? (parseFloat(document.getElementById('package-transfer').value) || 0) : 0,
            lfsStorage: lfsEnabled ? (parseFloat(document.getElementById('lfs-storage').value) || 0) : 0,
            lfsBandwidth: lfsEnabled ? (parseFloat(document.getElementById('lfs-bandwidth').value) || 0) : 0,
            codespaces: codespaceConfigs,
            storedCodespaces: codespacesEnabled ? (parseFloat(document.getElementById('stored-codespaces').value) || 0) : 0,
            avgProjectSize: codespacesEnabled ? (parseFloat(document.getElementById('avg-project-size').value) || 0) : 0,
            ghasCommitters: effectiveGhasCommitters,
            ghasCommittersSpecified: ghasCommittersInput > 0,
            ghasCodeSecurity: ghasCodeSecurityChecked,
            ghasSecretProtection: ghasSecretProtectionChecked,
            selectedFeatures: otherFeaturesEnabled ? this.getSelectedFeatures() : []
        };
    }

    calculateActionsUsage(usage) {
        const daysPerMonth = 30;
        let totalActualMinutes = 0;
        let totalBilledMinutes = 0;
        const runnerBreakdown = [];

        usage.runners.forEach(runner => {
            const actualMinutes = runner.jobsPerDay * runner.duration * daysPerMonth;
            const multiplier = PRICING.actions.multipliers[runner.type];
            const billedMinutes = actualMinutes * multiplier;

            totalActualMinutes += actualMinutes;
            totalBilledMinutes += billedMinutes;

            if (actualMinutes > 0) {
                runnerBreakdown.push({
                    type: runner.type,
                    actualMinutes: actualMinutes,
                    multiplier: multiplier,
                    billedMinutes: billedMinutes
                });
            }
        });

        return {
            totalMinutes: totalActualMinutes,
            billedMinutes: totalBilledMinutes,
            runnerBreakdown: runnerBreakdown
        };
    }

    calculatePlanCost(planKey, usage) {
        const plan = PRICING.plans[planKey];
        const actionsUsage = this.calculateActionsUsage(usage);

        let breakdown = {
            baseCost: plan.perUser * usage.users,
            copilotCost: 0,
            actionsCost: 0,
            packagesCost: 0,
            lfsCost: 0,
            codespacesCost: 0,
            ghasCost: 0,
            copilotDetails: {},
            actionsDetails: {},
            packagesDetails: {},
            lfsDetails: {},
            codespacesDetails: {},
            ghasDetails: {},
            canSupport: true,
            reasons: []
        };

        // Pro plan only supports 1 user
        if (planKey === 'pro' && usage.users > 1) {
            breakdown.canSupport = false;
            breakdown.reasons.push(`Pro plan only supports 1 user (you have ${usage.users} users)`);
        }

        // GitHub Advanced Security is only available in Team and Enterprise plans
        const ghasEnabled = usage.ghasCommitters > 0 && (usage.ghasCodeSecurity || usage.ghasSecretProtection);
        if ((planKey === 'free' || planKey === 'pro') && ghasEnabled) {
            breakdown.canSupport = false;
            breakdown.reasons.push('GitHub Advanced Security is only available in Team and Enterprise plans');
        }

        // Validate selected features against plan availability
        if (usage.selectedFeatures && usage.selectedFeatures.length > 0) {
            const unsupportedFeatures = [];

            usage.selectedFeatures.forEach(featureId => {
                const feature = FEATURE_AVAILABILITY[featureId];
                if (!feature) return;

                const availability = feature[planKey];

                // Feature not available at all for this plan
                if (availability === false) {
                    unsupportedFeatures.push(feature.name);
                }
                // Note: 'public' features are treated as available with a caveat, not as unavailable
            });

            if (unsupportedFeatures.length > 0) {
                breakdown.canSupport = false;
                const featureList = unsupportedFeatures.slice(0, 3).join(', ');
                const remaining = unsupportedFeatures.length - 3;
                breakdown.reasons.push(
                    `Missing features: ${featureList}${remaining > 0 ? ` and ${remaining} more` : ''}`
                );
            }
        }

        // GitHub Copilot calculation
        let copilotBaseCost = 0;
        let copilotOverageCost = 0;
        let copilotPlanName = '';

        // Use copilot users if specified (> 0), otherwise fall back to team size
        const effectiveCopilotUsers = usage.copilotUsers > 0 ? usage.copilotUsers : usage.users;

        if (usage.copilotPlan) {
            switch (usage.copilotPlan) {
                case 'individual-free':
                    copilotBaseCost = PRICING.copilot.individualFree;
                    copilotPlanName = 'Individual Free';
                    break;
                case 'individual-pro':
                    copilotBaseCost = PRICING.copilot.individualPro;
                    copilotPlanName = 'Individual Pro';
                    break;
                case 'individual-pro-plus':
                    copilotBaseCost = PRICING.copilot.individualProPlus;
                    copilotPlanName = 'Individual Pro+';
                    break;
                case 'org-business':
                    copilotBaseCost = PRICING.copilot.orgBusiness * effectiveCopilotUsers;
                    copilotPlanName = 'Business';
                    break;
                case 'org-enterprise':
                    copilotBaseCost = PRICING.copilot.orgEnterprise * effectiveCopilotUsers;
                    copilotPlanName = 'Enterprise';
                    break;
            }

            if (usage.copilotOverageRequests > 0) {
                copilotOverageCost = usage.copilotOverageRequests * PRICING.copilot.overageRate;
            }
        }

        breakdown.copilotCost = copilotBaseCost + copilotOverageCost;
        breakdown.copilotDetails = {
            plan: copilotPlanName,
            baseCost: copilotBaseCost,
            overageRequests: usage.copilotOverageRequests,
            overageCost: copilotOverageCost,
            users: effectiveCopilotUsers
        };

        // GitHub Actions calculation
        const includedMinutes = plan.actions.includedMinutes;
        const billedMinutes = actionsUsage.billedMinutes;
        const overageMinutes = Math.max(0, billedMinutes - includedMinutes);

        // For public repos, Actions are free
        if (usage.publicRepos) {
            breakdown.actionsCost = 0;
            breakdown.actionsDetails = {
                included: includedMinutes,
                used: billedMinutes,
                overage: 0,
                actualMinutes: actionsUsage.totalMinutes,
                runnerBreakdown: actionsUsage.runnerBreakdown,
                isFreePublic: true
            };
        } else {
            // Private repos - apply normal pricing
            if (overageMinutes > 0 && !plan.actions.canExceed) {
                breakdown.canSupport = false;
                breakdown.reasons.push(`Exceeds Free plan Actions limit (need ${billedMinutes.toFixed(0)} minutes, only ${includedMinutes} allowed)`);
            }

            if (overageMinutes > 0 && plan.actions.canExceed) {
                // Calculate overage cost based on actual minutes per runner type
                // Overage rates are per actual minute, not billed minute
                let totalOverageCost = 0;

                if (billedMinutes > 0) {
                    actionsUsage.runnerBreakdown.forEach(runner => {
                        // Calculate this runner's share of the total overage in billed minutes
                        const runnerProportion = runner.billedMinutes / billedMinutes;
                        const runnerBilledOverage = overageMinutes * runnerProportion;

                        // Convert billed overage back to actual minutes for this runner type
                        const runnerActualOverage = runnerBilledOverage / runner.multiplier;

                        // Apply the per-actual-minute rate
                        const overageRate = PRICING.actions.overageRates[runner.type];
                        totalOverageCost += runnerActualOverage * overageRate;
                    });
                }

                breakdown.actionsCost = totalOverageCost;
            }

            breakdown.actionsDetails = {
                included: includedMinutes,
                used: billedMinutes,
                overage: overageMinutes,
                actualMinutes: actionsUsage.totalMinutes,
                runnerBreakdown: actionsUsage.runnerBreakdown,
                isFreePublic: false
            };
        }

        // GitHub Packages calculation
        const storageOverage = Math.max(0, usage.packageStorage - plan.packages.storage);
        const transferOverage = Math.max(0, usage.packageTransfer - plan.packages.transfer);

        breakdown.packagesCost =
            (storageOverage * PRICING.packages.storageOverage) +
            (transferOverage * PRICING.packages.transferOverage);

        breakdown.packagesDetails = {
            storageIncluded: plan.packages.storage,
            storageUsed: usage.packageStorage,
            storageOverage: storageOverage,
            transferIncluded: plan.packages.transfer,
            transferUsed: usage.packageTransfer,
            transferOverage: transferOverage
        };

        // Git LFS calculation
        const lfsStorageOverage = Math.max(0, usage.lfsStorage - plan.lfs.storage);
        const lfsBandwidthOverage = Math.max(0, usage.lfsBandwidth - plan.lfs.bandwidth);

        breakdown.lfsCost =
            (lfsStorageOverage * PRICING.lfs.storageOverage) +
            (lfsBandwidthOverage * PRICING.lfs.bandwidthOverage);

        breakdown.lfsDetails = {
            storageIncluded: plan.lfs.storage,
            storageUsed: usage.lfsStorage,
            storageOverage: lfsStorageOverage,
            bandwidthIncluded: plan.lfs.bandwidth,
            bandwidthUsed: usage.lfsBandwidth,
            bandwidthOverage: lfsBandwidthOverage
        };

        // Codespaces calculation
        const weeksPerMonth = 4.33;
        let totalComputeHours = 0;
        const machineBreakdown = [];

        usage.codespaces.forEach(machine => {
            const monthlyHours = machine.developers * machine.hoursPerWeek * weeksPerMonth;
            const coreMultiplier = PRICING.codespaces.coreMultipliers[machine.cores];
            const coreHours = monthlyHours * coreMultiplier;

            totalComputeHours += coreHours;

            if (monthlyHours > 0) {
                machineBreakdown.push({
                    cores: machine.cores,
                    developers: machine.developers,
                    hoursPerWeek: machine.hoursPerWeek,
                    monthlyHours: monthlyHours,
                    coreHours: coreHours,
                    coreMultiplier: coreMultiplier
                });
            }
        });

        const includedCoreHours = plan.codespaces.coreHours;
        const computeOverage = Math.max(0, totalComputeHours - includedCoreHours);
        const computeCost = computeOverage * PRICING.codespaces.baseCoreRate;

        // Storage calculation
        const totalStorage = usage.storedCodespaces * usage.avgProjectSize * usage.users;
        const includedStorage = plan.codespaces.storage;
        const codespacesStorageOverage = Math.max(0, totalStorage - includedStorage);
        const storageCost = codespacesStorageOverage * PRICING.codespaces.storageRate;

        breakdown.codespacesCost = computeCost + storageCost;

        breakdown.codespacesDetails = {
            hoursIncluded: includedCoreHours,
            hoursUsed: totalComputeHours,
            hoursOverage: computeOverage,
            storageIncluded: includedStorage,
            storageUsed: totalStorage,
            storageOverage: codespacesStorageOverage,
            machineBreakdown: machineBreakdown,
            computeCost: computeCost,
            storageCost: storageCost
        };

        // GitHub Advanced Security calculation
        let ghasCodeSecurityCost = 0;
        let ghasSecretProtectionCost = 0;

        if (usage.ghasCommitters > 0) {
            if (usage.ghasCodeSecurity) {
                ghasCodeSecurityCost = usage.ghasCommitters * PRICING.ghas.codeSecurity;
            }
            if (usage.ghasSecretProtection) {
                ghasSecretProtectionCost = usage.ghasCommitters * PRICING.ghas.secretProtection;
            }
        }

        breakdown.ghasCost = ghasCodeSecurityCost + ghasSecretProtectionCost;
        breakdown.ghasDetails = {
            committers: usage.ghasCommitters,
            codeSecurity: usage.ghasCodeSecurity,
            secretProtection: usage.ghasSecretProtection,
            codeSecurityCost: ghasCodeSecurityCost,
            secretProtectionCost: ghasSecretProtectionCost
        };

        // Total cost
        breakdown.totalCost =
            breakdown.baseCost +
            breakdown.copilotCost +
            breakdown.actionsCost +
            breakdown.packagesCost +
            breakdown.lfsCost +
            breakdown.codespacesCost +
            breakdown.ghasCost;

        return breakdown;
    }

    calculate() {
        this.usage = this.getUsageInputs();
        this.results = {};

        // Calculate and display total Actions usage
        const actionsUsage = this.calculateActionsUsage(this.usage);
        this.updateActionsUsageSummary(actionsUsage);
        this.updateCodespacesUsageSummary();

        // Calculate costs for each plan
        for (const planKey in PRICING.plans) {
            this.results[planKey] = this.calculatePlanCost(planKey, this.usage);
        }

        // Find the best plan
        const availablePlans = Object.entries(this.results)
            .filter(([_, breakdown]) => breakdown.canSupport);

        let bestPlan = null;
        let lowestCost = Infinity;
        let bestIncludedFeatureCount = -1;

        availablePlans.forEach(([planKey, breakdown]) => {
            // Count fully included features (no caveats or add-ons)
            let includedFeatureCount = 0;
            if (this.usage.selectedFeatures && this.usage.selectedFeatures.length > 0) {
                this.usage.selectedFeatures.forEach(featureId => {
                    const feature = FEATURE_AVAILABILITY[featureId];
                    if (feature && feature[planKey] === true) {
                        includedFeatureCount++;
                    }
                });
            }

            // Price is primary factor, feature inclusion is tie-breaker
            const isBetter =
                breakdown.totalCost < lowestCost ||
                (breakdown.totalCost === lowestCost && includedFeatureCount > bestIncludedFeatureCount);

            if (isBetter) {
                lowestCost = breakdown.totalCost;
                bestIncludedFeatureCount = includedFeatureCount;
                bestPlan = planKey;
            }
        });

        this.renderResults(bestPlan);
    }

    updateActionsUsageSummary(actionsUsage) {
        const summaryDiv = document.getElementById('total-actions-usage');
        const actualMinutesSpan = document.getElementById('total-actual-minutes');
        const billedMinutesSpan = document.getElementById('total-billed-minutes');

        if (actionsUsage.totalMinutes === 0) {
            summaryDiv.classList.add('hidden');
        } else {
            summaryDiv.classList.remove('hidden');
            actualMinutesSpan.textContent = actionsUsage.totalMinutes.toLocaleString();
            billedMinutesSpan.textContent = actionsUsage.billedMinutes.toLocaleString();
        }
    }

    updateCodespacesUsageSummary() {
        const summaryDiv = document.getElementById('total-codespaces-usage');
        const totalStorageSpan = document.getElementById('total-storage-gb');

        const totalStorage = this.usage.storedCodespaces * this.usage.avgProjectSize * this.usage.users;

        if (totalStorage === 0) {
            summaryDiv.classList.add('hidden');
        } else {
            summaryDiv.classList.remove('hidden');
            totalStorageSpan.textContent = totalStorage.toFixed(1);
        }
    }

    hasAnyFeaturesEnabled() {
        // Check if any feature sections are enabled (not just team size)
        return document.getElementById('toggle-copilot').checked ||
               document.getElementById('toggle-actions').checked ||
               document.getElementById('toggle-packages').checked ||
               document.getElementById('toggle-lfs').checked ||
               document.getElementById('toggle-codespaces').checked ||
               document.getElementById('toggle-ghas').checked ||
               document.getElementById('toggle-other-features').checked;
    }

    renderResults(bestPlan) {
        const plansGrid = document.getElementById('plans-grid');
        plansGrid.innerHTML = '';

        const recommendation = document.getElementById('recommendation');

        // Only show recommendation if bestPlan exists AND at least one feature is enabled
        if (bestPlan && this.hasAnyFeaturesEnabled()) {
            const recommendationText = document.getElementById('recommendation-text');
            const planName = PRICING.plans[bestPlan].name;
            const totalCost = this.results[bestPlan].totalCost;

            recommendationText.textContent = `Based on your usage, the ${planName} plan is most cost-effective at $${totalCost.toFixed(2)} / month.`;
            recommendation.classList.remove('hidden');
        } else {
            // Hide recommendation if no features are enabled
            recommendation.classList.add('hidden');
        }

        // Render each plan card
        for (const [planKey, breakdown] of Object.entries(this.results)) {
            const plan = PRICING.plans[planKey];
            const card = this.createPlanCard(planKey, plan, breakdown, bestPlan === planKey);
            plansGrid.appendChild(card);
        }
    }

    getPlanIcon(planKey) {
        const icons = {
            free: '<svg class="plan-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>',
            pro: '<svg class="plan-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',
            team: '<svg class="plan-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
            enterprise: '<svg class="plan-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><line x1="8" y1="6" x2="8" y2="6" stroke-width="2" stroke-linecap="round"></line><line x1="12" y1="6" x2="12" y2="6" stroke-width="2" stroke-linecap="round"></line><line x1="16" y1="6" x2="16" y2="6" stroke-width="2" stroke-linecap="round"></line><line x1="8" y1="10" x2="8" y2="10" stroke-width="2" stroke-linecap="round"></line><line x1="12" y1="10" x2="12" y2="10" stroke-width="2" stroke-linecap="round"></line><line x1="16" y1="10" x2="16" y2="10" stroke-width="2" stroke-linecap="round"></line><line x1="8" y1="14" x2="8" y2="14" stroke-width="2" stroke-linecap="round"></line><line x1="12" y1="14" x2="12" y2="14" stroke-width="2" stroke-linecap="round"></line><line x1="16" y1="14" x2="16" y2="14" stroke-width="2" stroke-linecap="round"></line></svg>'
        };
        return icons[planKey] || '';
    }

    createPlanCard(planKey, plan, breakdown, isBest) {
        const card = document.createElement('div');
        card.className = 'plan-card';

        if (isBest && breakdown.canSupport) {
            card.classList.add('recommended');
        }

        if (!breakdown.canSupport) {
            card.classList.add('not-available');
        }

        let badgeHtml = '';
        if (isBest && breakdown.canSupport) {
            badgeHtml = '<span class="plan-badge best-value">Best Value</span>';
        } else if (!breakdown.canSupport) {
            badgeHtml = '<span class="plan-badge not-available">Not Available</span>';
        }

        // Check if this is Pro plan unavailable due to user count
        const isProUserLimit = planKey === 'pro' && !breakdown.canSupport &&
                               breakdown.reasons.some(r => r.includes('only supports 1 user'));

        const baseCostDisplay = isProUserLimit ? 'N/A' :
                               (breakdown.baseCost === 0 ? 'Free' : `$${breakdown.baseCost.toFixed(2)}`);

        let costBreakdownHtml = '';

        // Base cost
        if (breakdown.baseCost > 0) {
            costBreakdownHtml += `
                <div class="cost-item">
                    <span class="cost-label">Base Cost (${this.usage.users} user${this.usage.users > 1 ? 's' : ''})</span>
                    <span class="cost-value">${isProUserLimit ? 'N/A' : '$' + breakdown.baseCost.toFixed(2)}</span>
                </div>
            `;
        }

        // Copilot
        if (breakdown.copilotDetails.plan) {
            const details = breakdown.copilotDetails;
            const isOrgPlan = this.usage.copilotPlan && this.usage.copilotPlan.startsWith('org-');
            const planLabel = isOrgPlan ?
                `Copilot ${details.plan} (${details.users} user${details.users > 1 ? 's' : ''})` :
                `Copilot ${details.plan}`;

            costBreakdownHtml += `
                <div class="cost-item">
                    <span class="cost-label">${planLabel}</span>
                    <span class="cost-value overage">$${details.baseCost.toFixed(2)}</span>
                </div>
            `;

            if (details.overageRequests > 0) {
                costBreakdownHtml += `
                    <div class="cost-item">
                        <span class="cost-label">Copilot Overage (${details.overageRequests.toLocaleString()} requests)</span>
                        <span class="cost-value overage">+$${details.overageCost.toFixed(2)}</span>
                    </div>
                `;
            }
        }

        // Actions
        if (breakdown.actionsDetails.used > 0) {
            const details = breakdown.actionsDetails;

            // Show breakdown by runner type if multiple types exist
            let runnerInfo = '';
            if (details.runnerBreakdown && details.runnerBreakdown.length > 0) {
                const runnerSummaries = details.runnerBreakdown.map(r =>
                    `${r.actualMinutes.toFixed(0)} ${r.type} (${r.multiplier}x)`
                ).join(' + ');
                runnerInfo = runnerSummaries + ' = ';
            }

            if (details.isFreePublic) {
                costBreakdownHtml += `
                    <div class="cost-item">
                        <span class="cost-label">Actions (${runnerInfo}${details.used.toFixed(0)} billed min)</span>
                        <span class="cost-value included">Free for public repos</span>
                    </div>
                `;
            } else {
                costBreakdownHtml += `
                    <div class="cost-item">
                        <span class="cost-label">Actions (${runnerInfo}${details.used.toFixed(0)} billed min)</span>
                        <span class="cost-value ${details.overage > 0 ? 'overage' : 'included'}">
                            ${details.included.toLocaleString()} included${details.overage > 0 ? ', +$' + breakdown.actionsCost.toFixed(2) + ' overage' : ''}
                        </span>
                    </div>
                `;
            }
        }

        // Packages
        if (this.usage.packageStorage > 0 || this.usage.packageTransfer > 0) {
            const details = breakdown.packagesDetails;
            costBreakdownHtml += `
                <div class="cost-item">
                    <span class="cost-label">Packages Storage (${details.storageUsed} GB / ${details.storageIncluded} GB)</span>
                    <span class="cost-value ${details.storageOverage > 0 ? 'overage' : 'included'}">
                        ${details.storageOverage > 0 ? '+$' + (details.storageOverage * PRICING.packages.storageOverage).toFixed(2) : 'Included'}
                    </span>
                </div>
                <div class="cost-item">
                    <span class="cost-label">Packages Transfer (${details.transferUsed} GB / ${details.transferIncluded} GB)</span>
                    <span class="cost-value ${details.transferOverage > 0 ? 'overage' : 'included'}">
                        ${details.transferOverage > 0 ? '+$' + (details.transferOverage * PRICING.packages.transferOverage).toFixed(2) : 'Included'}
                    </span>
                </div>
            `;
        }

        // LFS
        if (this.usage.lfsStorage > 0 || this.usage.lfsBandwidth > 0) {
            const details = breakdown.lfsDetails;
            costBreakdownHtml += `
                <div class="cost-item">
                    <span class="cost-label">LFS Storage (${details.storageUsed} GiB / ${details.storageIncluded} GiB included)</span>
                    <span class="cost-value ${details.storageOverage > 0 ? 'overage' : 'included'}">
                        ${details.storageOverage > 0 ? '+$' + (details.storageOverage * PRICING.lfs.storageOverage).toFixed(2) : 'Included'}
                    </span>
                </div>
                <div class="cost-item">
                    <span class="cost-label">LFS Bandwidth (${details.bandwidthUsed} GiB / ${details.bandwidthIncluded} GiB included)</span>
                    <span class="cost-value ${details.bandwidthOverage > 0 ? 'overage' : 'included'}">
                        ${details.bandwidthOverage > 0 ? '+$' + (details.bandwidthOverage * PRICING.lfs.bandwidthOverage).toFixed(2) : 'Included'}
                    </span>
                </div>
            `;
        }

        // Codespaces
        const hasCodespaceUsage = breakdown.codespacesDetails.hoursUsed > 0 || breakdown.codespacesDetails.storageUsed > 0;
        if (hasCodespaceUsage) {
            const details = breakdown.codespacesDetails;

            // Compute breakdown
            if (details.hoursUsed > 0) {
                costBreakdownHtml += `
                    <div class="cost-item">
                        <span class="cost-label">Codespaces Compute (${details.hoursUsed.toFixed(0)} core-hrs / ${details.hoursIncluded} included)</span>
                        <span class="cost-value ${details.hoursOverage > 0 ? 'overage' : 'included'}">
                            ${details.hoursOverage > 0 ? '+$' + details.computeCost.toFixed(2) : details.hoursIncluded > 0 ? 'Included' : '$' + details.computeCost.toFixed(2)}
                        </span>
                    </div>
                `;
            }

            // Storage breakdown
            if (details.storageUsed > 0) {
                costBreakdownHtml += `
                    <div class="cost-item">
                        <span class="cost-label">Codespaces Storage (${details.storageUsed.toFixed(1)} GB / ${details.storageIncluded} GB)</span>
                        <span class="cost-value ${details.storageOverage > 0 ? 'overage' : 'included'}">
                            ${details.storageOverage > 0 ? '+$' + details.storageCost.toFixed(2) : details.storageIncluded > 0 ? 'Included' : '$' + details.storageCost.toFixed(2)}
                        </span>
                    </div>
                `;
            }
        }

        // GitHub Advanced Security
        if (breakdown.ghasDetails.committers > 0) {
            const details = breakdown.ghasDetails;
            const committerLabel = this.usage.ghasCommittersSpecified
                ? `${details.committers} committers`
                : `${details.committers} committers (using team size)`;

            if (details.codeSecurity) {
                costBreakdownHtml += `
                    <div class="cost-item">
                        <span class="cost-label">GHAS Code Security (${committerLabel})</span>
                        <span class="cost-value overage">$${details.codeSecurityCost.toFixed(2)}</span>
                    </div>
                `;
            }
            if (details.secretProtection) {
                costBreakdownHtml += `
                    <div class="cost-item">
                        <span class="cost-label">GHAS Secret Protection (${committerLabel})</span>
                        <span class="cost-value overage">$${details.secretProtectionCost.toFixed(2)}</span>
                    </div>
                `;
            }
        }

        // Other Features
        if (this.usage.selectedFeatures && this.usage.selectedFeatures.length > 0) {
            this.usage.selectedFeatures.forEach(featureId => {
                const feature = FEATURE_AVAILABILITY[featureId];
                if (!feature) return;

                const availability = feature[planKey];
                let statusText = '';
                let statusClass = 'included';

                if (availability === false) {
                    statusText = 'Not available';
                    statusClass = 'exceeded';
                } else if (availability === true) {
                    statusText = 'Included';
                    statusClass = 'included';
                } else if (availability === 'public') {
                    if (this.usage.publicRepos) {
                        statusText = 'Included';
                        statusClass = 'included';
                    } else {
                        statusText = 'Public repos only';
                        statusClass = 'exceeded';
                    }
                } else if (availability === 'addon') {
                    // Check if this feature requires GHAS
                    const ghasRequirement = GHAS_REQUIREMENTS[featureId];
                    if (ghasRequirement) {
                        const ghasEnabled = ghasRequirement === 'secretProtection'
                            ? this.usage.ghasSecretProtection
                            : this.usage.ghasCodeSecurity;

                        if (ghasEnabled) {
                            statusText = 'Included';
                            statusClass = 'included';
                        } else {
                            const requirementName = ghasRequirement === 'secretProtection'
                                ? 'Secret Protection'
                                : 'Code Security';
                            statusText = `Requires ${requirementName}`;
                            statusClass = 'overage';
                        }
                    } else {
                        statusText = 'Add-on required';
                        statusClass = 'overage';
                    }
                } else if (availability === 'server') {
                    statusText = 'Enterprise Server only';
                    statusClass = 'overage';
                } else if (availability === 'cloud') {
                    statusText = 'Enterprise Cloud only';
                    statusClass = 'overage';
                }

                costBreakdownHtml += `
                    <div class="cost-item">
                        <span class="cost-label">${feature.name}</span>
                        <span class="cost-value ${statusClass}">${statusText}</span>
                    </div>
                `;
            });
        }

        let unavailableReason = '';
        if (!breakdown.canSupport) {
            unavailableReason = `
                <div class="cost-item">
                    <span class="cost-label cost-value exceeded">⚠️ ${breakdown.reasons.join('; ')}</span>
                </div>
            `;
        }

        card.innerHTML = `
            <div class="plan-header">
                <h3 class="plan-name">${this.getPlanIcon(planKey)}${plan.name}</h3>
                ${badgeHtml}
            </div>
            ${breakdown.canSupport ? `
                <div class="plan-base-cost">
                    <div class="base-cost-label">Base Plan Cost</div>
                    <div class="base-cost-amount">${baseCostDisplay}<span class="period"> / month</span></div>
                </div>
            ` : ''}
            ${unavailableReason}
            ${breakdown.canSupport ? `
                <div class="cost-breakdown">
                    ${costBreakdownHtml}
                </div>
                <div class="total-cost">
                    <span class="total-label">Total Monthly Cost</span>
                    <span class="total-value">$${breakdown.totalCost.toFixed(2)}</span>
                </div>
            ` : ''}
        `;

        return card;
    }
}

// Initialize calculator when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const calculator = new GitHubPricingCalculator();
    calculator.calculate(); // Initial calculation with default values
});
