"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Lang = "pt" | "en";

type Dictionary = Record<keyof (typeof T)["pt"], string>;

type LangContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
};

const STORAGE_KEY = "user-manager-lang";
const LangContext = createContext<LangContextType | null>(null);

export const T = {
  pt: {
    appName: "User Manager",
    appDesc: "Gestão de usuários, perfis e conta pessoal",
    navDashboard: "Dashboard",
    navUsers: "Usuários",
    navProfiles: "Perfis",
    navProfile: "Meu perfil",
    navOpen: "Abrir menu",
    themeLight: "Modo claro",
    themeDark: "Modo escuro",
    langSwitch: "Trocar idioma",
    currentTheme: "Tema atual",
    currentLanguage: "Idioma atual",
    logout: "Sair",
    loggingOut: "Saindo...",
    logoutSuccess: "Sessão encerrada com sucesso.",
    logoutError: "Não foi possível sair da conta.",
    landingEyebrow: "Painel administrativo",
    landingTitle:
      "Controle usuários, permissões e identidade com uma interface mais clara.",
    landingDesc:
      "Um sistema administrativo enxuto, com visual preto e branco, suporte a dark mode e navegação mais objetiva.",
    landingSignIn: "Entrar",
    landingOpenApp: "Abrir painel",
    authSignInTitle: "Entrar",
    authSignInDesc: "Use o usuário padrão admin com a senha admin123.",
    authSignUpTitle: "Criar conta",
    authUsernameOrEmail: "Usuário ou e-mail",
    authPassword: "Senha",
    authFirstName: "Nome",
    authLastName: "Sobrenome",
    authUsername: "Usuário",
    authEmail: "E-mail",
    authSubmitting: "Enviando...",
    authSigningIn: "Entrando...",
    authSignInAction: "Entrar",
    authSignUpAction: "Criar conta",
    authNoAccount: "Ainda não tem conta?",
    authCreateHere: "Cadastre-se no sistema",
    authCreated: "Conta criada com sucesso.",
    authCreateError: "Não foi possível criar a conta.",
    authSignedIn: "Sessão iniciada com sucesso.",
    authSignInError: "Não foi possível entrar.",
    dashTitle: "Dashboard",
    dashDesc: "Uma visão rápida do ambiente administrativo.",
    dashUsers: "Usuários",
    dashProfiles: "Perfis",
    dashActiveUsers: "Usuários ativos",
    dashSummary: "Resumo geral",
    dashSummaryDesc:
      "Acompanhe estrutura, crescimento e distribuição do sistema em um só lugar.",
    dashDirectoryTitle: "Mapa rápido",
    dashDirectoryDesc:
      "Acesse as áreas principais e acompanhe os próximos passos da operação.",
    dashCardUsersDesc:
      "Gerencie contas, dados de contato e status de acesso.",
    dashCardProfilesDesc:
      "Organize permissões e agrupe usuários por função.",
    dashCardProfileDesc:
      "Revise seus dados, segurança e preferências visuais.",
    dashOpenSection: "Abrir área",
    usersTitle: "Usuários",
    usersDesc:
      "Acompanhe a base de contas com uma leitura mais clara e operacional.",
    usersTotal: "Total de usuários",
    usersWithEmail: "Com e-mail",
    usersWithPhone: "Com telefone",
    usersSearchPlaceholder: "Buscar por nome, usuário, e-mail ou perfil",
    usersEmpty: "Nenhum usuário encontrado para esse filtro.",
    usersInitials: "Iniciais",
    colName: "Nome",
    colUsername: "Usuário",
    colEmail: "E-mail",
    colProfile: "Perfil",
    colPhone: "Telefone",
    colStatus: "Status",
    statusActive: "Ativo",
    statusInactive: "Inativo",
    profilesTitle: "Perfis",
    profilesDesc: "Perfis disponíveis para associação de usuários.",
    profileUsers: "usuário(s)",
    noDesc: "Sem descrição.",
    loading: "Carregando perfil...",
    loadError: "Não foi possível carregar o perfil.",
    personal: "Informações pessoais",
    personalDesc: "Mantenha seus dados de identificação atualizados.",
    firstName: "Nome",
    lastName: "Sobrenome",
    savedName: "Nome atualizado com sucesso.",
    account: "Dados da conta",
    accountDesc:
      "Revise os contatos e o perfil vinculado à sua conta.",
    email: "E-mail",
    profileLabel: "Perfil",
    phone: "Telefone",
    savedAccount: "Dados da conta atualizados.",
    customization: "Aparência",
    customizationDesc:
      "Escolha um estilo monocromático para o seu avatar e destaque visual.",
    colorLabel: "Estilo do avatar",
    colorDesc:
      "Os estilos seguem a identidade preto e branco do sistema.",
    savedColor: "Aparência do perfil atualizada.",
    colorUpdated: "Estilo atualizado.",
    security: "Segurança",
    securityDesc:
      "Proteja sua conta com uma senha nova sempre que necessário.",
    changePassword: "Alterar senha",
    changePasswordDesc:
      "Abra o formulário para definir uma nova senha para a sua conta.",
    password: "Nova senha",
    confirmPassword: "Confirmar senha",
    savedPassword: "Senha atualizada com sucesso.",
    passwordMismatch: "As senhas não coincidem.",
    confirmRequired: "Confirme a senha.",
    save: "Salvar",
    savePassword: "Salvar senha",
    saving: "Salvando...",
    cancel: "Cancelar",
    accountSince: "Conta registrada",
    quickStats: "Resumo do perfil",
    quickStatsDesc:
      "Uma leitura rápida dos dados principais da sua conta.",
    contactReady: "Contato preenchido",
    profileStyleClassic: "Clássico",
    profileStyleSoft: "Suave",
    profileStyleContrast: "Contraste",
    profileStyleSlate: "Grafite",
    profileStyleRed: "Ferrari",
    profileStyleOcean: "Oceano",
    profileStyleLime: "Lima",
    fieldRequired: "Campo obrigatório",
  },
  en: {
    appName: "User Manager",
    appDesc: "User, profile and personal account management",
    navDashboard: "Dashboard",
    navUsers: "Users",
    navProfiles: "Profiles",
    navProfile: "My profile",
    navOpen: "Open menu",
    themeLight: "Light mode",
    themeDark: "Dark mode",
    langSwitch: "Switch language",
    currentTheme: "Current theme",
    currentLanguage: "Current language",
    logout: "Logout",
    loggingOut: "Logging out...",
    logoutSuccess: "Session ended successfully.",
    logoutError: "Could not sign out.",
    landingEyebrow: "Admin workspace",
    landingTitle:
      "Control users, permissions and identity through a cleaner interface.",
    landingDesc:
      "A lean admin system with a black-and-white visual language, dark mode support and more focused navigation.",
    landingSignIn: "Sign in",
    landingOpenApp: "Open dashboard",
    authSignInTitle: "Sign in",
    authSignInDesc:
      "Use the default admin user with the admin123 password.",
    authSignUpTitle: "Create account",
    authUsernameOrEmail: "Username or e-mail",
    authPassword: "Password",
    authFirstName: "First name",
    authLastName: "Last name",
    authUsername: "Username",
    authEmail: "E-mail",
    authSubmitting: "Submitting...",
    authSigningIn: "Signing in...",
    authSignInAction: "Sign in",
    authSignUpAction: "Create account",
    authNoAccount: "Don't have an account yet?",
    authCreateHere: "Create one now",
    authCreated: "Account created successfully.",
    authCreateError: "Could not create the account.",
    authSignedIn: "Session started successfully.",
    authSignInError: "Could not sign in.",
    dashTitle: "Dashboard",
    dashDesc: "A quick overview of the admin workspace.",
    dashUsers: "Users",
    dashProfiles: "Profiles",
    dashActiveUsers: "Active users",
    dashSummary: "Overview",
    dashSummaryDesc:
      "Track structure, growth and system distribution from one place.",
    dashDirectoryTitle: "Quick map",
    dashDirectoryDesc:
      "Jump into the main areas and keep the next operational steps in sight.",
    dashCardUsersDesc:
      "Manage accounts, contact data and access status.",
    dashCardProfilesDesc:
      "Organize permissions and group users by role.",
    dashCardProfileDesc:
      "Review your data, security and visual preferences.",
    dashOpenSection: "Open section",
    usersTitle: "Users",
    usersDesc:
      "Track the account base with a clearer, more operational view.",
    usersTotal: "Total users",
    usersWithEmail: "With e-mail",
    usersWithPhone: "With phone",
    usersSearchPlaceholder:
      "Search by name, username, e-mail or profile",
    usersEmpty: "No users found for this filter.",
    usersInitials: "Initials",
    colName: "Name",
    colUsername: "Username",
    colEmail: "E-mail",
    colProfile: "Profile",
    colPhone: "Phone",
    colStatus: "Status",
    statusActive: "Active",
    statusInactive: "Inactive",
    profilesTitle: "Profiles",
    profilesDesc: "Profiles available for user association.",
    profileUsers: "user(s)",
    noDesc: "No description.",
    loading: "Loading profile...",
    loadError: "Could not load profile.",
    personal: "Personal information",
    personalDesc: "Keep your identity details up to date.",
    firstName: "First name",
    lastName: "Last name",
    savedName: "Name updated successfully.",
    account: "Account details",
    accountDesc:
      "Review contact channels and the profile linked to your account.",
    email: "E-mail",
    profileLabel: "Profile",
    phone: "Phone",
    savedAccount: "Account details updated.",
    customization: "Appearance",
    customizationDesc:
      "Choose a monochrome style for your avatar and visual highlights.",
    colorLabel: "Avatar style",
    colorDesc:
      "All styles follow the system black-and-white identity.",
    savedColor: "Profile appearance updated.",
    colorUpdated: "Style updated.",
    security: "Security",
    securityDesc:
      "Protect your account with a fresh password whenever needed.",
    changePassword: "Change password",
    changePasswordDesc:
      "Open the form to define a new password for your account.",
    password: "New password",
    confirmPassword: "Confirm password",
    savedPassword: "Password updated successfully.",
    passwordMismatch: "Passwords do not match.",
    confirmRequired: "Please confirm the password.",
    save: "Save",
    savePassword: "Save password",
    saving: "Saving...",
    cancel: "Cancel",
    accountSince: "Account created",
    quickStats: "Profile summary",
    quickStatsDesc:
      "A quick read of the main details behind your account.",
    contactReady: "Contact info complete",
    profileStyleClassic: "Classic",
    profileStyleSoft: "Soft",
    profileStyleContrast: "Contrast",
    profileStyleSlate: "Slate",
    profileStyleRed: "Ferrari",
    profileStyleOcean: "Ocean",
    profileStyleLime: "Lime",
    fieldRequired: "Required field",
  },
} as const satisfies Record<Lang, Record<string, string>>;

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("pt");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "pt" || stored === "en") {
      setLang(stored);
      return;
    }

    const browser = window.navigator.language.toLowerCase();
    setLang(browser.startsWith("pt") ? "pt" : "en");
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggleLang: () => setLang((prev) => (prev === "pt" ? "en" : "pt")),
    }),
    [lang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}

export function useT(): Dictionary {
  const { lang } = useLanguage();
  return T[lang];
}
