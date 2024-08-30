import * as React from 'react';
import List from '@mui/material/List';
import FaqItem from './FaqItem';

const faqData = [
    {
        title: 'What is your return policy?',
        content:
            'You can return any item within 30 days of purchase for a full refund. The item must be in its original condition and packaging. Please contact our customer support to initiate a return.',
    },
    {
        title: 'How long does shipping take?',
        content:
            'Shipping typically takes 5-7 business days for domestic orders and 10-15 business days for international orders. Delays may occur due to customs or local postal services.',
    },
    {
        title: 'Do you offer international shipping?',
        content:
            'Yes, we offer international shipping to most countries. Shipping rates and delivery times vary based on the destination. Please refer to our shipping policy for more details.',
    },
    {
        title: 'How can I track my order?',
        content:
            'Once your order is shipped, you will receive an email with a tracking number and a link to track your package. You can also track your order through your account on our website.',
    },
    {
        title: 'What payment methods do you accept?',
        content:
            'We accept major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All payments are securely processed to protect your information.',
    },
    {
        title: 'Can I change or cancel my order?',
        content:
            'You can change or cancel your order within 24 hours of placing it. Please contact our customer support team as soon as possible to make any changes or cancellations.',
    },
    {
        title: 'Do you offer discounts for bulk purchases?',
        content:
            'Yes, we offer discounts for bulk purchases. Please contact our sales team with the details of your order, and we will provide you with a customized quote.',
    },
    {
        title: 'How do I reset my password?',
        content:
            "To reset your password, click on the 'Forgot Password' link on the login page and follow the instructions. You will receive an email with a link to reset your password.",
    },

    {
        title: 'How do I contact customer support?',
        content:
            'You can reach our customer support team via email at support@example.com or by calling our hotline at 1-800-123-4567. Our support team is available Monday to Friday, 9 AM to 5 PM EST.',
    },
    {
        title: 'Where can I find your store locations?',
        content:
            'Our store locations can be found on the "Store Locator" page of our website. Enter your city or zip code to find the nearest store. You can also use Google Maps for additional directions.',
    },
    {
        title: 'Do you have a loyalty program?',
        content:
            'Yes, we have a loyalty program that rewards you with points for every purchase. You can sign up for the program on our website or at any of our store locations. Points can be redeemed for discounts and special offers.',
    },
    {
        title: 'What should I do if I receive a damaged item?',
        content:
            'If you receive a damaged item, please contact our customer support team immediately. Provide your order number and a description of the damage, and we will assist you with a replacement or refund.',
    },
    {
        title: 'Can I modify my order after it has been placed?',
        content:
            'Orders can be modified within 1 hour of placement. After that, changes may not be possible. Please contact customer support as soon as possible if you need to make any changes.',
    },
    {
        title: 'What is your privacy policy?',
        content:
            'We are committed to protecting your privacy. Our privacy policy outlines how we collect, use, and protect your personal information. You can read the full privacy policy on our website under the "Privacy Policy" section.',
    },
    {
        title: 'Do you offer gift cards?',
        content:
            'Yes, we offer gift cards in various denominations. You can purchase gift cards online through our website or at any of our store locations. Gift cards can be used for purchases both online and in-store.',
    },
    {
        title: 'Can I track my return?',
        content:
            'Yes, once your return is processed, you will receive an email with tracking information. You can use this information to track the status of your return until it reaches our warehouse.',
    },
    {
        title: 'What is your warranty policy?',
        content:
            'We offer a one-year warranty on all products purchased from our store. If you experience any issues with your product within the warranty period, please contact customer support for assistance with repairs or replacements.',
    },
    {
        title: 'How do I unsubscribe from your email list?',
        content:
            'To unsubscribe from our email list, click the "unsubscribe" link at the bottom of any of our emails. You will be removed from our mailing list and will no longer receive promotional emails from us.',
    },
];

export default function FaqList() {
    return (
        <List
            sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
                mt: 3,
                borderRadius: 5,
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            {faqData.map((item, index) => (
                <FaqItem
                    key={index}
                    title={item.title}
                    content={item.content}
                />
            ))}
        </List>
    );
}
