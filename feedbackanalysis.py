from ibm_watson import NaturalLanguageUnderstandingV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator

authenticator = IAMAuthenticator(os.getenv('WATSON_API_KEY'))
nlu = NaturalLanguageUnderstandingV1(
    version='2024-04-01',
    authenticator=authenticator
)
nlu.set_service_url(os.getenv('WATSON_URL'))

def analyze_feedback(text):
    response = nlu.analyze(
        text=text,
        features=Features(sentiment=SentimentOptions())
    ).get_result()
    return response['sentiment']['document']['score']

