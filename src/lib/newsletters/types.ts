export type NewsletterIssue = {
  id: string;
  title: string;
  subtitle?: string;
  period: string;
  href: string;
  coverImage?: { src: string; alt: string };
};
