import { Schema } from 'mongoose';

export const OrderSchema: Schema = new Schema(
  {
    additional_info: {
      ip_address: String,
      items: [
        {
          id: String,
          title: String,
          description: String,
          picture_url: String,
          category_id: String,
          quantity: Number,
          currency_id: String,
          unit_price: Number,
          type: String,
          event_date: String,
          warranty: Boolean,
          category_descriptor: {
            passenger: {
              first_name: String,
              last_name: String,
            },
            route: {
              departure: String,
              destination: String,
              departure_date_time: String,
              arrival_date_time: String,
              company: String,
            },
          },
        },
      ],
      payer: {
        type: String,
        id: String,
        operator_id: Schema.Types.Mixed,
        email: String,
        registration_date: String,
        is_prime_user: String,
        is_first_purchase_online: String,
        last_purchase: String,
        authentication_type: String,
        identification: {
          number: String,
          type: String,
        },
        phone: {
          area_code: String,
          number: String,
          extension: String,
        },
        first_name: String,
        last_name: String,
        entity_type: String,
        address: {
          zip_code: String,
          street_name: String,
          street_number: String,
        },
      },
      shipments: {
        mode: String,
        local_pickup: Boolean,
        dimensions: String,
        default_shipping_method: Number,
        free_methods: [
          {
            id: Number,
          },
        ],
        cost: Number,
        free_shipping: Boolean,
        receiver_address: {
          zip_code: String,
          street_name: String,
          street_number: Number,
          floor: String,
          apartment: String,
          city_name: String,
          state_name: String,
          country_name: String,
        },
        express_shipment: Boolean,
      },
    },
    application_fee: String,
    binary_mode: Boolean,
    callback_url: String,
    campaign_id: String,
    capture: Boolean,
    coupon_amount: Number,
    coupon_code: String,
    date_of_expiration: String,
    description: String,
    differential_pricing_id: Number,
    external_reference: String,
    installments: Number,
    issuer_id: Number,
    metadata: Object,
    notification_url: String,
    payment_method_id: String,
    statement_descriptor: String,
    token: String,
    transaction_amount: Number,
    payer: {
      type: String,
      id: String,
      email: String,
      identification: {
        type: String,
        number: String,
      },
      phone: {
        area_code: String,
        number: String,
        extension: String,
      },

      first_name: String,
      last_name: String,
      entity_type: String,
      address: {
        neighborhood: String,
        city: String,
        federal_unit: String,
      },
    },
    forward_data: {
      sub_merchant: {
        sub_merchant_id: String,
        mcc: String,
        country: String,
        address_door_number: Number,
        zip: String,
        document_number: String,
        city: String,
        address_street: String,
        business_name: String,
        region_code_iso: String,
        region_code: String,
        document_type: String,
        phone: String,
        url: String,
      },
    },
    point_of_interaction: {
      linkedTo: String,
      type: String,
      transaction_data: {
        first_time_use: Boolean,
        subscription_sequence: {
          number: Number,
          total: Number,
        },
        subscription_id: String,
        invoice_period: {
          period: Number,
          type: String,
        },
        payment_reference: {
          id: String,
        },
        billing_date: String,
      },
    },
    sponsor_id: Number,
    transaction_details: {
      financial_institution: String,
    },
    createdAt: Date,
    updatedAt: Date,
  },
  {
    strict: true,
    strictQuery: false,
  },
);
