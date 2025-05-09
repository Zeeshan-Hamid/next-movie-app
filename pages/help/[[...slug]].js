import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout';

const helpContent = {
  'faqs': {
    title: 'Frequently Asked Questions',
    content: [
      { 
        question: 'How do I search for movies?', 
        answer: 'You can use the search bar at the top of the Movies page to search for movies by title, director, or genre.' 
      },
      { 
        question: 'Can I filter movies by genre?', 
        answer: 'Yes! On the Movies page, you can use the genre filter dropdown to see movies from a specific genre.' 
      },
      { 
        question: 'How do I see details about a director?', 
        answer: 'You can click on "View Director Details" when viewing a movie, or you can go to the Directors page to see all directors.' 
      }
    ]
  },
  'contact': {
    title: 'Contact Us',
    content: `
      <p>Have questions or feedback? We'd love to hear from you!</p>
      <p>Email: <strong>info@moviehouse.com</strong></p>
      <p>Phone: <strong>(123) 456-7890</strong></p>
      <p>Address: <strong>123 Movie Lane, Hollywood, CA 90001</strong></p>
    `
  },
  'privacy': {
    title: 'Privacy Policy',
    content: `
      <p>At Movie House, we take your privacy seriously. This privacy policy describes how we collect, use, and protect your information.</p>
      
      <h3>Information We Collect</h3>
      <p>We collect basic information such as your name and email address when you create an account.</p>
      
      <h3>How We Use Your Information</h3>
      <p>We use your information to personalize your experience and improve our services.</p>
      
      <h3>Security</h3>
      <p>We implement various security measures to maintain the safety of your personal information.</p>
    `
  }
};

const defaultHelpContent = {
  title: 'Help Center',
  content: `
    <p>Welcome to the Movie House Help Center! Here you can find answers to common questions and get support.</p>
    <p>Please select a topic from the menu on the left to get started.</p>
  `
};

export default function HelpPage({ content }) {
  const router = useRouter();
  
  return (
    <Layout title={`Movie House - ${content.title}`}>
      <div style={{ display: 'flex', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ width: '250px', marginRight: '30px' }}>
          <h3>Help Topics</h3>
          <ul style={{ 
            listStyle: 'none', 
            padding: '0',
            margin: '0'
          }}>
            <li style={{ marginBottom: '10px' }}>
              <Link 
                href="/help"
                style={{ 
                  display: 'block',
                  padding: '10px',
                  backgroundColor: !router.query.slug ? '#0070f3' : '#000',
                  color: !router.query.slug ? 'white' : 'inherit',
                  borderRadius: '4px'
                }}
              >
                Help Home
              </Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link 
                href="/help/faqs"
                style={{ 
                  display: 'block',
                  padding: '10px',
                  backgroundColor: router.query.slug?.[0] === 'faqs' ? '#0070f3' : '#000',
                  color: router.query.slug?.[0] === 'faqs' ? 'white' : 'inherit',
                  borderRadius: '4px'
                }}
              >
                FAQs
              </Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link 
                href="/help/contact"
                style={{ 
                  display: 'block',
                  padding: '10px',
                  backgroundColor: router.query.slug?.[0] === 'contact' ? '#0070f3' : '#000',
                  color: router.query.slug?.[0] === 'contact' ? 'white' : 'inherit',
                  borderRadius: '4px'
                }}
              >
                Contact Us
              </Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link 
                href="/help/privacy"
                style={{ 
                  display: 'block',
                  padding: '10px',
                  backgroundColor: router.query.slug?.[0] === 'privacy' ? '#0070f3' : '#000',
                  color: router.query.slug?.[0] === 'privacy' ? 'white' : 'inherit',
                  borderRadius: '4px'
                }}
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
        
        <div style={{ flex: '1' }}>
          <h1>{content.title}</h1>
          
          {Array.isArray(content.content) ? (
            <div>
              {content.content.map((item, index) => (
                <div 
                  key={index} 
                  style={{ 
                    marginBottom: '20px',
                    borderBottom: index < content.content.length - 1 ? '1px solid #eee' : 'none',
                    paddingBottom: '20px'
                  }}
                >
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              ))}
            </div>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: content.content }} />
          )}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: [] } },
      { params: { slug: ['faqs'] } },
      { params: { slug: ['contact'] } },
      { params: { slug: ['privacy'] } }
    ],
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug?.[0];
  
  if (!slug || !helpContent[slug]) {
    return {
      props: {
        content: defaultHelpContent
      }
    };
  }
  
  return {
    props: {
      content: helpContent[slug]
    }
  };
} 