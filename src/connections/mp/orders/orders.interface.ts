import { Types } from 'mongoose';

export interface IOrder extends Document {
  id: Types.ObjectId;
  additional_info: {
    ip_address: string;
    items: [
      {
        id: string;
        title: string;
        description: string;
        picture_url: string;
        category_id: string;
        quantity: number;
        currency_id: string;
        unit_price: number;
        type: string;
        event_date: string;
        warranty: boolean;
        category_descriptor: {
          passenger: {
            first_name: string;
            last_name: string;
          };
          route: {
            departure: string;
            destination: string;
            departure_date_time: string;
            arrival_date_time: string;
            company: string;
          };
        };
      },
    ];
    payer: {
      type: string;
      id: string;
      operator_id: any;
      email: string;
      registration_date: string;
      is_prime_user: string;
      is_first_purchase_online: string;
      last_purchase: string;
      authentication_type: string;
      identification: {
        number: string;
        type: string;
      };
      phone: {
        area_code: string;
        number: string;
        extension: string;
      };
      first_name: string;
      last_name: string;
      entity_type: string;
      address: {
        zip_code: string;
        street_name: string;
        street_number: string;
      };
    };
    shipments: {
      mode: string;
      local_pickup: boolean;
      dimensions: string;
      default_shipping_method: number;
      free_methods: [
        {
          id: number;
        },
      ];
      cost: number;
      free_shipping: boolean;
      receiver_address: {
        zip_code: string;
        street_name: string;
        street_number: number;
        floor: string;
        apartment: string;
        city_name: string;
        state_name: string;
        country_name: string;
      };
      express_shipment: boolean;
    };
  };
  application_fee: string;
  binary_mode: boolean;
  callback_url: string;
  campaign_id: string;
  capture: boolean;
  coupon_amount: number;
  coupon_code: string;
  date_of_expiration: string;
  description: string;
  differential_pricing_id: number;
  external_reference: string;
  installments: number;
  issuer_id: number;
  metadata: object;
  notification_url: string;
  payment_method_id: string;
  statement_descriptor: string;
  token: string;
  transaction_amount: number;
  payer: {
    type: string;
    id: string;
    email: string;
    identification: {
      type: string;
      number: string;
    };
    phone: {
      area_code: string;
      number: string;
      extension: string;
    };

    first_name: string;
    last_name: string;
    entity_type: string;
    address: {
      neighborhood: string;
      city: string;
      federal_unit: string;
    };
  };
  forward_data: {
    sub_merchant: {
      sub_merchant_id: string;
      mcc: string;
      country: string;
      address_door_number: number;
      zip: string;
      document_number: string;
      city: string;
      address_street: string;
      business_name: string;
      region_code_iso: string;
      region_code: string;
      document_type: string;
      phone: string;
      url: string;
    };
  };
  point_of_interaction: {
    linkedTo: string;
    type: string;
    transaction_data: {
      first_time_use: boolean;
      subscription_sequence: {
        number: number;
        total: number;
      };
      subscription_id: string;
      invoice_period: {
        period: number;
        type: string;
      };
      payment_reference: {
        id: string;
      };
      billing_date: string;
    };
  };
  sponsor_id: number;
  transaction_details: {
    financial_institution: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
