import { useState } from 'react';
import {
  Save, Eye, EyeOff, Upload, Moon, Sun, Globe, Facebook, Instagram, FileText, Lock, Shield, Truck, CheckCircle, AlertTriangle, FilePlus, XCircle, Mail, MapPin, Users, DollarSign, Package, BookOpen, Settings as SettingsIcon, FlaskConical, ChevronDown, ChevronUp
} from 'lucide-react';

const LANGUAGES = [
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'Anglais' },
  { code: 'wo', label: 'Wolof' },
  { code: 'pul', label: 'Pular' },
  { code: 'ar', label: 'Arabe' },
];

const LOGISTICS_PARTNERS = ['DHL', 'Chronopost', 'La Poste', 'Jumia', 'Autre'];

const Settings = () => {
  // Onglet actif
  const [tab, setTab] = useState('general');

  // 1. Général
  const [platformName, setPlatformName] = useState('Taaru Sénégal');
  const [logo, setLogo] = useState<string | null>(null);
  const [slogan, setSlogan] = useState('La mode sénégalaise à portée de main');
  const [supportEmail, setSupportEmail] = useState('contact@taaru-senegal.com');
  const [supportPhone, setSupportPhone] = useState('+221 77 123 45 67');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');

  // 2. Langues
  const [enabledLanguages, setEnabledLanguages] = useState(['fr', 'en']);
  const [defaultLanguage, setDefaultLanguage] = useState('fr');
  const [autoTranslate, setAutoTranslate] = useState(false);

  // 3. Paiements & commissions
  const [tailorPremium, setTailorPremium] = useState(10000);
  const [orderCommission, setOrderCommission] = useState(10);
  const [fabricCommission, setFabricCommission] = useState(5);
  const [defaultTrainingPrice, setDefaultTrainingPrice] = useState(25000);

  // 4. Livraison
  const [localDelivery, setLocalDelivery] = useState(true);
  const [diasporaDelivery, setDiasporaDelivery] = useState(false);
  const [logisticsPartners, setLogisticsPartners] = useState(['DHL']);
  const [processingDelay, setProcessingDelay] = useState(7);

  // 5. Sécurité & modération
  const [manualModelValidation, setManualModelValidation] = useState(true);
  const [moderationEnabled, setModerationEnabled] = useState(true);
  const [maxReports, setMaxReports] = useState(5);
  const [blockedIPs, setBlockedIPs] = useState('');

  // 6. Légal
  const [cgu, setCGU] = useState('');
  const [privacy, setPrivacy] = useState('');
  const [legalNotice, setLegalNotice] = useState('');
  const [cguFile, setCGUFile] = useState<File | null>(null);
  const [privacyFile, setPrivacyFile] = useState<File | null>(null);
  const [legalNoticeFile, setLegalNoticeFile] = useState<File | null>(null);

  // 7. Avancé / Expérimental
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [adminNotifications, setAdminNotifications] = useState(false);
  const [virtualTryOn, setVirtualTryOn] = useState(false);
  const [sectionsEnabled, setSectionsEnabled] = useState({
    formations: true,
    accessoires: true,
    evenements: true,
  });

  // Logo upload
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Fichiers légaux
  const handleLegalFile = (setter: (f: File) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setter(e.target.files[0]);
  };

  // Gestion des langues activées
  const toggleLanguage = (code: string) => {
    setEnabledLanguages(langs => langs.includes(code) ? langs.filter(l => l !== code) : [...langs, code]);
  };

  // Gestion des partenaires logistiques
  const togglePartner = (partner: string) => {
    setLogisticsPartners(partners => partners.includes(partner) ? partners.filter(p => p !== partner) : [...partners, partner]);
  };

  // Gestion des sections activées
  const toggleSection = (section: string) => {
    setSectionsEnabled(sections => ({ ...sections, [section]: !sections[section] }));
  };

  // Enregistrement
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Envoyer les données au backend
    alert('Paramètres sauvegardés !');
  };

  // UI onglets
  const tabs = [
    { key: 'general', label: 'Général', icon: SettingsIcon },
    { key: 'languages', label: 'Langues', icon: Globe },
    { key: 'payments', label: 'Paiements', icon: DollarSign },
    { key: 'delivery', label: 'Livraison', icon: Truck },
    { key: 'moderation', label: 'Modération', icon: Shield },
    { key: 'legal', label: 'Légal', icon: FileText },
    { key: 'advanced', label: 'Avancé', icon: FlaskConical },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8 px-2 sm:px-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Paramètres</h1>
      {/* Onglets scrollables sur mobile */}
      <div className="flex gap-2 mb-6 border-b overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        {tabs.map(t => (
          <button
            key={t.key}
            className={`flex items-center gap-2 px-4 py-2 border-b-2 -mb-px transition-all whitespace-nowrap ${tab === t.key ? 'border-[#00853F] text-[#00853F] font-semibold bg-gray-50' : 'border-transparent text-gray-600 hover:text-[#00853F]'}`}
            onClick={() => setTab(t.key)}
            type="button"
          >
            <t.icon className="w-4 h-4" /> {t.label}
          </button>
        ))}
      </div>
      <form onSubmit={handleSave} className="space-y-8">
        {/* Onglet Général */}
        {tab === 'general' && (
          <section className="bg-white p-6 rounded-lg shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Informations générales</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nom du projet</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#00853F] focus:border-[#00853F]" value={platformName} onChange={e => setPlatformName(e.target.value)} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Logo</label>
                <div className="flex items-center gap-4 mt-1 flex-col sm:flex-row">
                  {logo && (<img src={logo} alt="Logo" className="h-12 w-12 rounded-full object-cover border" />)}
                  <label className="inline-flex items-center px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200">
                    <Upload className="w-4 h-4 mr-2" />
                    <span>Changer</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Slogan / description courte</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#00853F] focus:border-[#00853F]" value={slogan} onChange={e => setSlogan(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email de contact support</label>
                <input type="email" className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#00853F] focus:border-[#00853F]" value={supportEmail} onChange={e => setSupportEmail(e.target.value)} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Numéro WhatsApp / téléphone du support</label>
                <input type="tel" className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#00853F] focus:border-[#00853F]" value={supportPhone} onChange={e => setSupportPhone(e.target.value)} required />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Facebook</label>
                  <input type="url" className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#00853F] focus:border-[#00853F]" value={facebook} onChange={e => setFacebook(e.target.value)} placeholder="https://facebook.com/..." />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Instagram</label>
                  <input type="url" className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#00853F] focus:border-[#00853F]" value={instagram} onChange={e => setInstagram(e.target.value)} placeholder="https://instagram.com/..." />
                </div>
              </div>
            </div>
          </section>
        )}
        {/* Onglet Langues */}
        {tab === 'languages' && (
          <section className="bg-white p-6 rounded-lg shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Gestion des langues</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Langues activées</label>
                <div className="flex flex-wrap gap-3">
                  {LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      type="button"
                      className={`px-3 py-2 rounded-lg border flex items-center gap-2 ${enabledLanguages.includes(lang.code) ? 'bg-[#00853F] text-white border-[#00853F]' : 'bg-gray-100 text-gray-700 border-gray-300'}`}
                      onClick={() => toggleLanguage(lang.code)}
                    >
                      <Globe className="w-4 h-4" /> {lang.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Langue par défaut</label>
                <select className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#00853F] focus:border-[#00853F]" value={defaultLanguage} onChange={e => setDefaultLanguage(e.target.value)}>
                  {LANGUAGES.filter(l => enabledLanguages.includes(l.code)).map(lang => (
                    <option key={lang.code} value={lang.code}>{lang.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="autoTranslate" checked={autoTranslate} onChange={e => setAutoTranslate(e.target.checked)} />
                <label htmlFor="autoTranslate" className="text-sm text-gray-700">Traduction auto activée ?</label>
              </div>
            </div>
          </section>
        )}
        {/* Onglet Paiements */}
        {tab === 'payments' && (
          <section className="bg-white p-6 rounded-lg shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Tarification & commissions</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Abonnement Tailleur Premium (FCFA)</label>
                <input type="number" min={0} className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#00853F] focus:border-[#00853F]" value={tailorPremium} onChange={e => setTailorPremium(Number(e.target.value))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Commission sur commandes (%)</label>
                <input type="number" min={0} max={100} className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#00853F] focus:border-[#00853F]" value={orderCommission} onChange={e => setOrderCommission(Number(e.target.value))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Commission sur ventes tissu/accessoires (%)</label>
                <input type="number" min={0} max={100} className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#00853F] focus:border-[#00853F]" value={fabricCommission} onChange={e => setFabricCommission(Number(e.target.value))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Prix par défaut des formations (FCFA)</label>
                <input type="number" min={0} className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#00853F] focus:border-[#00853F]" value={defaultTrainingPrice} onChange={e => setDefaultTrainingPrice(Number(e.target.value))} />
              </div>
            </div>
          </section>
        )}
        {/* Onglet Livraison */}
        {tab === 'delivery' && (
          <section className="bg-white p-6 rounded-lg shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Livraison & zones couvertes</h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="localDelivery" checked={localDelivery} onChange={e => setLocalDelivery(e.target.checked)} />
                <label htmlFor="localDelivery" className="text-sm text-gray-700">Activer la livraison locale</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="diasporaDelivery" checked={diasporaDelivery} onChange={e => setDiasporaDelivery(e.target.checked)} />
                <label htmlFor="diasporaDelivery" className="text-sm text-gray-700">Activer la livraison diaspora</label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Partenaires logistiques</label>
                <div className="flex flex-wrap gap-3">
                  {LOGISTICS_PARTNERS.map(partner => (
                    <button
                      key={partner}
                      type="button"
                      className={`px-3 py-2 rounded-lg border flex items-center gap-2 ${logisticsPartners.includes(partner) ? 'bg-[#00853F] text-white border-[#00853F]' : 'bg-gray-100 text-gray-700 border-gray-300'}`}
                      onClick={() => togglePartner(partner)}
                    >
                      <Truck className="w-4 h-4" /> {partner}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Délai de traitement par défaut (jours ouvrés)</label>
                <input type="number" min={1} className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#00853F] focus:border-[#00853F]" value={processingDelay} onChange={e => setProcessingDelay(Number(e.target.value))} />
              </div>
            </div>
          </section>
        )}
        {/* Onglet Modération */}
        {tab === 'moderation' && (
          <section className="bg-white p-6 rounded-lg shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Sécurité & modération</h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="manualModelValidation" checked={manualModelValidation} onChange={e => setManualModelValidation(e.target.checked)} />
                <label htmlFor="manualModelValidation" className="text-sm text-gray-700">Activer la validation manuelle des modèles tailleurs</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="moderationEnabled" checked={moderationEnabled} onChange={e => setModerationEnabled(e.target.checked)} />
                <label htmlFor="moderationEnabled" className="text-sm text-gray-700">Activer la modération des signalements</label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre max de signalements avant blocage automatique</label>
                <input type="number" min={1} className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#00853F] focus:border-[#00853F]" value={maxReports} onChange={e => setMaxReports(Number(e.target.value))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Liste des IP/balises bloquées (séparées par virgule)</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#00853F] focus:border-[#00853F]" value={blockedIPs} onChange={e => setBlockedIPs(e.target.value)} placeholder="192.168.1.1, spamword, ..." />
              </div>
            </div>
          </section>
        )}
        {/* Onglet Légal */}
        {tab === 'legal' && (
          <section className="bg-white p-6 rounded-lg shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Contenus légaux / documents</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Conditions Générales d'Utilisation (CGU)</label>
                <textarea className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#00853F] focus:border-[#00853F]" rows={4} value={cgu} onChange={e => setCGU(e.target.value)} />
                <input type="file" accept="application/pdf" className="mt-2" onChange={handleLegalFile(f => setCGUFile(f))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Politique de confidentialité</label>
                <textarea className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#00853F] focus:border-[#00853F]" rows={4} value={privacy} onChange={e => setPrivacy(e.target.value)} />
                <input type="file" accept="application/pdf" className="mt-2" onChange={handleLegalFile(f => setPrivacyFile(f))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Mentions légales</label>
                <textarea className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#00853F] focus:border-[#00853F]" rows={4} value={legalNotice} onChange={e => setLegalNotice(e.target.value)} />
                <input type="file" accept="application/pdf" className="mt-2" onChange={handleLegalFile(f => setLegalNoticeFile(f))} />
              </div>
            </div>
          </section>
        )}
        {/* Onglet Avancé */}
        {tab === 'advanced' && (
          <section className="bg-white p-6 rounded-lg shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Fonctionnalités expérimentales</h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="maintenanceMode" checked={maintenanceMode} onChange={e => setMaintenanceMode(e.target.checked)} />
                <label htmlFor="maintenanceMode" className="text-sm text-gray-700">Activer le mode maintenance</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="adminNotifications" checked={adminNotifications} onChange={e => setAdminNotifications(e.target.checked)} />
                <label htmlFor="adminNotifications" className="text-sm text-gray-700">Activer les notifications admin par email</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="virtualTryOn" checked={virtualTryOn} onChange={e => setVirtualTryOn(e.target.checked)} />
                <label htmlFor="virtualTryOn" className="text-sm text-gray-700">Activer la version test de l'essayage virtuel</label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sections du site activées</label>
                <div className="flex flex-wrap gap-3">
                  {Object.entries(sectionsEnabled).map(([key, value]) => (
                    <button
                      key={key}
                      type="button"
                      className={`px-3 py-2 rounded-lg border flex items-center gap-2 ${value ? 'bg-[#00853F] text-white border-[#00853F]' : 'bg-gray-100 text-gray-700 border-gray-300'}`}
                      onClick={() => toggleSection(key)}
                    >
                      <CheckCircle className="w-4 h-4" /> {key.charAt(0).toUpperCase() + key.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
        {/* Bouton sauvegarder global */}
        <div className="flex justify-end">
          <button type="submit" className="flex items-center px-6 py-2 bg-[#00853F] text-white rounded-lg font-semibold hover:bg-[#006B32] shadow-sm gap-2 w-full sm:w-auto">
            <Save className="w-5 h-5" />
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings; 