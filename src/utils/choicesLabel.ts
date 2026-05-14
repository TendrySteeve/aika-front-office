export function getSexLabel(gender: string): string {
    const SEX_CHOICES: { [key: string]: string } = {
        'male': 'Masculin',
        'female': 'Féminin',
    };
    return SEX_CHOICES[gender] || 'Inconnu';
}

export function getMaritalStatusLabel(status: string): string {
    const MARITAL_STATUS_CHOICES: { [key: string]: string } = {
        'single': 'Célibataire',
        'married': 'Marié(e)',
        'divorced': 'Divorcé(e)',
        'widowed': 'Veuf(ve)',
    };
    return MARITAL_STATUS_CHOICES[status] || 'Inconnu';
}

export function getContractTypeLabel(contractType: string): string {
    const CONTRACT_TYPE_CHOICES: { [key: string]: string } = {
        'CDI': 'Contrat à Durée Indéterminée',
        'CDD': 'Contrat à Durée Déterminée',
        'stage': 'Stage',
        'consultant': 'Consultant',
    };
    return CONTRACT_TYPE_CHOICES[contractType] || 'Inconnu';
}

export function getLevelSkillLabel(level: string): string {
    const LEVEL_CHOICES: { [key: string]: string } = {
        'beginner': 'Débutant',
        'intermediate': 'Intermédiaire',
        'advanced': 'Avancé',
        'expert': 'Expert',
    };
    return LEVEL_CHOICES[level] || 'Inconnu';
}

export function getStatusLabel(status: string): string {
    const STATUS_CHOICES: { [key: string]: string } = {
        'PENDING': 'En attente',
        'ACCEPTED': 'Accepté',
        'REJECTED': 'Rejeté',
        'CANCELED': 'Annulé',
    };
    return STATUS_CHOICES[status] || 'Inconnu';
}

export function getPeriodLabel(period: string): string {
    const PERIOD_CHOICES: { [key: string]: string } = {
        'AM': 'Matin',
        'PM': 'Après-midi',
    };
    return PERIOD_CHOICES[period] || 'Inconnu';
}