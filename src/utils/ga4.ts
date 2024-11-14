import ReactGA4 from "react-ga4";

export const initializeGoogleAnalytics = () => {
  ReactGA4.initialize("G-ZXKDHJBK23");

  console.log("GA INITIALIZED");
};

export const trackGoogleAnalyticsEvent = (
  category: string,
  action: string,
  label: string
) => {
  console.log("GA event:", category, ":", action, ":", label);
  ReactGA4.event({
    category: category,
    action: action,
    label: label,
  });
};
