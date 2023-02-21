import { useState, useEffect } from 'react';
import { PricingClient } from '../services/api-clients/pricing-client';

export function useGetInstallmentValues(requestedLoanAmount) {
  const [installmentValues, setInstallmentValues] = useState({});

  useEffect(() => {
    const getInstallmentValues = async () => {
      if (requestedLoanAmount && !isNaN(requestedLoanAmount)) {
        try {
          const pricingClient = new PricingClient();
          const data = await pricingClient.getPaymentInstallmentsByLoanAmount(
            requestedLoanAmount
          );
          setInstallmentValues(data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getInstallmentValues();
  }, [requestedLoanAmount]);

  return [installmentValues];
}
